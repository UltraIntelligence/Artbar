create table if not exists public.site_media_overrides (
  slot_key text primary key,
  draft_asset jsonb,
  published_asset jsonb,
  previous_published_asset jsonb,
  publish_batch_id text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  published_at timestamptz
);

alter table public.site_media_overrides enable row level security;

comment on table public.site_media_overrides is 'Stores draft/live site image overrides for artbar.co.jp. Service-role only; first media-admin version is image-only.';

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'artbar-site-media',
  'artbar-site-media',
  true,
  31457280,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif'
  ]
)
on conflict (id) do update
set
  name = excluded.name,
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
