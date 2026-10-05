begin;

-- Single atomic snapshot preserves the existing admin import and pricing contract.
create table if not exists public.easybatt_config (
  id text primary key check (id = 'main'),
  config jsonb not null check (jsonb_typeof(config) = 'object'),
  revision uuid not null default gen_random_uuid(),
  updated_at timestamptz not null default now()
);

alter table public.easybatt_config enable row level security;
revoke all on public.easybatt_config from anon, authenticated;
grant select, insert, update on public.easybatt_config to service_role;

-- Public product photographs only. No customer documents or private files here.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('easybatt-models', 'easybatt-models', true, 3145728,
  array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- No client write policy: only the authenticated admin's server route uploads.
commit;
