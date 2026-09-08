# Public AI/tool readability

- `/robots.txt` allows public paths and excludes `/api/`. Robots directives are crawler preferences, not access controls; inquiry data remains protected by application routes.
- `/catalog/` is a server-rendered text directory, with 100 products per page and ordinary HTML pagination links. The homepage visibly links to it. It is the same content for users and bots, not cloaking.
- Every `/products/{slug}` page contains the product name, images, SKU names, public USD prices, MOQ and inquiry contacts in HTML and Product/Offer JSON-LD.
- `/llms.txt` describes public resources. It is an optional discovery convention, not a guarantee of AI indexing or recommendations.
- `/catalog.md` and `/products/{slug}.md` expose public content in Markdown. HTML pages link to their Markdown alternate. Markdown responses use `noindex, follow` to avoid competing with canonical HTML pages in search.
- `/products.json` and `/sitemap.xml` remain public. The sitemap contains the homepage and all canonical product pages; the six directory pages are discoverable through HTML pagination.
- GET and HEAD work for machine-readable routes. No authentication, JavaScript execution or API key is needed to read public products.
- No supplier costs, supplier URLs or private inquiry records are added to these endpoints. No WAF disablement, broad security bypass, or new AI-training permission is part of this change.

Run `node scripts/check-ai-access.mjs` after deployment to simulate public requests with common AI search/user-agent strings. These are not requests from the providers' real crawler IPs and cannot prove that every provider can fetch, index or recommend the site. `--cloudflare` attempts a read-only audit of zone bot/security settings using the existing Wrangler login; insufficient permissions must be reported, not bypassed.
