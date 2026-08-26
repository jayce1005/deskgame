CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  source_url TEXT NOT NULL UNIQUE,
  source_title TEXT NOT NULL,
  title_en TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  main_image TEXT NOT NULL,
  source_price_cny REAL NOT NULL,
  price_usd REAL NOT NULL,
  weight_kg REAL NOT NULL DEFAULT 0,
  description_en TEXT NOT NULL,
  bullets_json TEXT NOT NULL DEFAULT '[]',
  skus_json TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'published',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_products_status_updated
ON products(status, updated_at DESC);
