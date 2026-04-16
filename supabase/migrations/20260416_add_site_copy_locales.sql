create table if not exists public.site_copy_locales (
  locale text primary key,
  draft_payload jsonb not null,
  published_payload jsonb not null,
  previous_published_payload jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  published_at timestamptz
);

alter table public.site_copy_locales enable row level security;

comment on table public.site_copy_locales is 'Stores the draft/live Japanese site copy snapshots for artbar.co.jp. Service-role only.';
