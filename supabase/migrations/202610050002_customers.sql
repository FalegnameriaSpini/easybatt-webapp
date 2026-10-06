begin;

create table public.easybatt_customers (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (length(btrim(full_name)) between 1 and 120),
  email text not null,
  account_type text not null check (account_type in ('private', 'professional')),
  company_name text not null default '',
  vat_number text not null default '',
  status text not null check (status in ('private', 'pending', 'approved', 'rejected')),
  price_list_id text,
  email_confirmed_at timestamptz,
  marketing_consent boolean not null default false,
  marketing_updated_at timestamptz not null default now(),
  consent_version text not null,
  privacy_version text not null,
  privacy_acknowledged_at timestamptz not null default now(),
  revision uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((account_type = 'private' and status = 'private' and price_list_id is null)
    or (account_type = 'professional' and status <> 'private'
      and length(btrim(company_name)) between 1 and 160
      and vat_number ~ '^[0-9]{11}$' and vat_number <> '00000000000')),
  check (status = 'approved' or price_list_id is null)
);
create index easybatt_customers_status_created on public.easybatt_customers(status, created_at desc);

create table public.easybatt_consent_events (
  id bigint generated always as identity primary key,
  customer_id uuid not null references public.easybatt_customers(id) on delete cascade,
  granted boolean not null,
  consent_version text not null,
  source text not null check (source in ('registration', 'account')),
  occurred_at timestamptz not null default now()
);
create table public.easybatt_customer_reviews (
  id bigint generated always as identity primary key,
  customer_id uuid not null references public.easybatt_customers(id) on delete cascade,
  previous_status text not null,
  status text not null,
  previous_price_list_id text,
  price_list_id text,
  occurred_at timestamptz not null default now()
);

alter table public.easybatt_customers enable row level security;
alter table public.easybatt_consent_events enable row level security;
alter table public.easybatt_customer_reviews enable row level security;
revoke all on public.easybatt_customers, public.easybatt_consent_events, public.easybatt_customer_reviews from anon, authenticated;
grant select, update on public.easybatt_customers to service_role;
grant select on public.easybatt_consent_events, public.easybatt_customer_reviews to service_role;

-- Metadata supplies contact details only, never approval or price-list permissions.
create function public.easybatt_auth_customer() returns trigger
language plpgsql security definer set search_path = '' as $$
declare m jsonb; kind text;
begin
  if TG_OP = 'INSERT' then
    m := new.raw_user_meta_data;
    if m ->> 'registration_source' is distinct from 'easybatt-v1' then return new; end if;
    if m -> 'privacy_acknowledged' is distinct from 'true'::jsonb
      or m ->> 'consent_version' is distinct from '2026-10-05-v1'
      or jsonb_typeof(m -> 'marketing_consent') is distinct from 'boolean' then
      raise exception 'Invalid registration consent';
    end if;
    kind := m ->> 'account_type';
    insert into public.easybatt_customers
      (id, full_name, email, account_type, company_name, vat_number, status, email_confirmed_at,
       marketing_consent, consent_version, privacy_version)
    values (new.id, btrim(m ->> 'full_name'), new.email, kind,
      case when kind = 'professional' then btrim(m ->> 'company_name') else '' end,
      case when kind = 'professional' then m ->> 'vat_number' else '' end,
      case when kind = 'professional' then 'pending' else 'private' end,
      new.email_confirmed_at, (m ->> 'marketing_consent')::boolean, '2026-10-05-v1', '2026-10-05-v1');
  elsif new.email is distinct from old.email or new.email_confirmed_at is distinct from old.email_confirmed_at then
    update public.easybatt_customers set email = new.email, email_confirmed_at = new.email_confirmed_at where id = new.id;
  end if;
  return new;
end;
$$;
revoke all on function public.easybatt_auth_customer() from public, anon, authenticated;
create trigger easybatt_auth_customer_insert after insert on auth.users for each row execute function public.easybatt_auth_customer();
create trigger easybatt_auth_customer_update after update of email, email_confirmed_at on auth.users for each row execute function public.easybatt_auth_customer();

create function public.easybatt_customer_before_update() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  new.revision := gen_random_uuid();
  new.updated_at := now();
  if new.marketing_consent is distinct from old.marketing_consent or new.consent_version is distinct from old.consent_version then
    new.marketing_updated_at := now();
  end if;
  return new;
end;
$$;
revoke all on function public.easybatt_customer_before_update() from public, anon, authenticated;
create trigger easybatt_customer_update before update on public.easybatt_customers for each row execute function public.easybatt_customer_before_update();

create function public.easybatt_customer_audit() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if TG_OP = 'INSERT' then
    insert into public.easybatt_consent_events(customer_id, granted, consent_version, source)
      values(new.id, new.marketing_consent, new.consent_version, 'registration');
  else
    if new.marketing_consent is distinct from old.marketing_consent or new.consent_version is distinct from old.consent_version then
      insert into public.easybatt_consent_events(customer_id, granted, consent_version, source)
        values(new.id, new.marketing_consent, new.consent_version, 'account');
    end if;
    if new.status is distinct from old.status or new.price_list_id is distinct from old.price_list_id then
      insert into public.easybatt_customer_reviews(customer_id, previous_status, status, previous_price_list_id, price_list_id)
        values(new.id, old.status, new.status, old.price_list_id, new.price_list_id);
    end if;
  end if;
  return new;
end;
$$;
revoke all on function public.easybatt_customer_audit() from public, anon, authenticated;
create trigger easybatt_customer_audit after insert or update on public.easybatt_customers for each row execute function public.easybatt_customer_audit();

commit;
