create table public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  interest text,
  message text not null,
  created_at timestamptz not null default now()
);
alter table public.contact_inquiries enable row level security;
create policy "Anyone can submit inquiries" on public.contact_inquiries for insert to anon, authenticated with check (true);