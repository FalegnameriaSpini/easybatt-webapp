begin;

create table if not exists public.easybatt_project_requests (
  id uuid primary key,
  payload_hash text not null,
  full_name text not null, email text not null, phone text not null,
  company text not null default '', profession text not null,
  town text not null, province text not null,
  intervention text not null, metres text not null, timing text not null,
  notes text not null default '', source jsonb not null default '{}'::jsonb,
  privacy_version text not null, privacy_url text not null,
  privacy_acknowledged_at timestamptz not null default now(),
  marketing_consent boolean not null default false, marketing_text text not null,
  status text not null default 'new' check (status in ('new','to_contact','contacted','evaluating','suitable','unsuitable','opportunity','customer')),
  staff_notes text not null default '' check (length(staff_notes) <= 4000),
  follow_up_on date,
  revision uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index if not exists easybatt_projects_created on public.easybatt_project_requests(created_at desc, id);
create index if not exists easybatt_projects_status on public.easybatt_project_requests(status, created_at desc);

-- Transactional outbox for the future Brevo connector; no external calls here.
create table if not exists public.easybatt_project_deliveries (
  project_id uuid primary key references public.easybatt_project_requests(id) on delete cascade,
  provider text not null default 'brevo' check (provider = 'brevo'),
  status text not null default 'pending' check (status in ('pending','processing','delivered','failed')),
  attempts integer not null default 0,
  external_id text, last_error text,
  created_at timestamptz not null default now(), delivered_at timestamptz
);

create table if not exists public.easybatt_project_rate_limits (
  key text not null, window_start timestamptz not null, attempts integer not null,
  primary key (key, window_start)
);
alter table public.easybatt_project_requests enable row level security;
alter table public.easybatt_project_deliveries enable row level security;
alter table public.easybatt_project_rate_limits enable row level security;
revoke all on public.easybatt_project_requests, public.easybatt_project_rate_limits, public.easybatt_project_deliveries from public, anon, authenticated;
grant select, insert, update, delete on public.easybatt_project_requests, public.easybatt_project_rate_limits, public.easybatt_project_deliveries to service_role;

-- Atomic idempotency and shared limits also apply across separate Vercel instances.
create or replace function public.easybatt_submit_project(p_id uuid, p_hash text, p_data jsonb, p_ip_key text, p_email_key text)
returns text language plpgsql security invoker set search_path = '' as $$
declare
  existing_hash text;
  bucket timestamptz := date_trunc('hour', now());
  rate_key text;
  attempts integer;
begin
  perform pg_advisory_xact_lock(hashtextextended(p_id::text, 0));
  select payload_hash into existing_hash from public.easybatt_project_requests where id = p_id;
  if found then
    if existing_hash = p_hash then return 'duplicate'; else return 'conflict'; end if;
  end if;
  delete from public.easybatt_project_rate_limits where window_start < now() - interval '2 days';
  foreach rate_key in array array[p_ip_key, p_email_key] loop
    insert into public.easybatt_project_rate_limits as limits(key, window_start, attempts)
    values (rate_key, bucket, 1)
    on conflict (key, window_start) do update set attempts = limits.attempts + 1
    returning limits.attempts into attempts;
    if attempts > (case when rate_key = p_email_key then 3 else 5 end) then return 'rate_limited'; end if;
  end loop;
  insert into public.easybatt_project_requests (
    id, payload_hash, full_name, email, phone, company, profession, town, province,
    intervention, metres, timing, notes, source, privacy_version, privacy_url, marketing_consent, marketing_text
  ) values (
    p_id, p_hash, p_data->>'full_name', p_data->>'email', p_data->>'phone', p_data->>'company',
    p_data->>'profession', p_data->>'town', p_data->>'province', p_data->>'intervention',
    p_data->>'metres', p_data->>'timing', p_data->>'notes', p_data->'source',
    p_data->>'privacy_version', p_data->>'privacy_url', (p_data->>'marketing_consent')::boolean, p_data->>'marketing_text'
  );
  insert into public.easybatt_project_deliveries(project_id) values (p_id);
  return 'created';
end;
$$;
revoke all on function public.easybatt_submit_project(uuid, text, jsonb, text, text) from public, anon, authenticated;
grant execute on function public.easybatt_submit_project(uuid, text, jsonb, text, text) to service_role;

commit;
