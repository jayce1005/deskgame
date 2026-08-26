CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL DEFAULT '',
  product_title TEXT NOT NULL DEFAULT '',
  buyer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS inquiries_status_created_at
  ON inquiries (status, created_at DESC);
