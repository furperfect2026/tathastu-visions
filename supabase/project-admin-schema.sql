-- Tathastu Infra project admin setup
-- Run this once in Supabase SQL Editor, then create an admin user in Authentication > Users.

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null check (category in ('realty', 'construction', 'interior')),
  location text not null default 'Pune',
  year integer not null default extract(year from now())::integer,
  image_url text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

alter table public.projects enable row level security;

drop policy if exists "Published projects are public" on public.projects;
create policy "Published projects are public"
on public.projects
for select
using (is_published = true or auth.role() = 'authenticated');

drop policy if exists "Authenticated admins can add projects" on public.projects;
create policy "Authenticated admins can add projects"
on public.projects
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated admins can update projects" on public.projects;
create policy "Authenticated admins can update projects"
on public.projects
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated admins can delete projects" on public.projects;
create policy "Authenticated admins can delete projects"
on public.projects
for delete
to authenticated
using (true);

insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Project images are public" on storage.objects;
create policy "Project images are public"
on storage.objects
for select
using (bucket_id = 'project-images');

drop policy if exists "Authenticated admins can upload project images" on storage.objects;
create policy "Authenticated admins can upload project images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'project-images');

drop policy if exists "Authenticated admins can update project images" on storage.objects;
create policy "Authenticated admins can update project images"
on storage.objects
for update
to authenticated
using (bucket_id = 'project-images')
with check (bucket_id = 'project-images');

drop policy if exists "Authenticated admins can delete project images" on storage.objects;
create policy "Authenticated admins can delete project images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'project-images');
