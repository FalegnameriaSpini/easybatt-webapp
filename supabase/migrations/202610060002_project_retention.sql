begin;

-- Historical enquiries need a verified contact date; do not infer it from edits.
alter table public.easybatt_project_requests
  add column if not exists last_contact_on date,
  add column if not exists retention_due_on date
    generated always as ((last_contact_on + interval '12 months')::date) stored;
create index if not exists easybatt_projects_retention
  on public.easybatt_project_requests(retention_due_on, id) where status <> 'customer';

create or replace function public.easybatt_project_dates()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if tg_op = 'INSERT' and new.last_contact_on is null then
    new.last_contact_on := (new.created_at at time zone 'Europe/Rome')::date;
  end if;
  if new.last_contact_on is not null and (
    new.last_contact_on < (new.created_at at time zone 'Europe/Rome')::date
    or new.last_contact_on > (now() at time zone 'Europe/Rome')::date
  ) then
    raise exception 'Invalid last contact date' using errcode = '23514';
  end if;
  if tg_op = 'UPDATE' then
    new.revision := gen_random_uuid();
    new.updated_at := now();
  end if;
  return new;
end;
$$;
revoke all on function public.easybatt_project_dates() from public, anon, authenticated;
grant execute on function public.easybatt_project_dates() to service_role;
drop trigger if exists easybatt_project_dates on public.easybatt_project_requests;
create trigger easybatt_project_dates before insert or update on public.easybatt_project_requests
for each row execute function public.easybatt_project_dates();

-- No scheduled job and no deletion in this migration.
commit;
