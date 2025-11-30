create table projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  business_name text,
  industry text,
  audience text,
  keywords text,
  tone text,
  layout text default 'Modern',
  content jsonb
);
