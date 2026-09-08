# BoardGame B2B — English Factory Catalog

一个不做在线成交的英文 B2B 产品展示站。当前目录来自 Mercado 插件导出的商品表，共 572 个商品、897 个 SKU。

## 实际工作流程

1. 使用现成的 Mercado/1688 导出插件，批量导出 XLSX 或 CSV 商品表。
2. 把导出文件交给 Codex。
3. Codex 逐项核对商品图与商品标题、SKU 图片与 SKU 名称，然后生成英文名称。
4. 表内价格视为美元进货成本，展示价按 `成本 × 1.25` 计算并保留两位小数。
5. 生成公开的 `public/products.json`，下载并按内容哈希去重商品图片。
6. 图片单独上传 Cloudflare R2，逐张校验云端图片内容后，商品 JSON 使用 `https://images.boardgameb2b.com/images/catalog/` 地址。不依赖阿里原图，也不依赖本地电脑。
7. 推送 GitHub 保存代码，再通过 Wrangler 部署到 Cloudflare Workers 免费域名。

公开网站不包含进货成本、1688 来源链接、购物车、支付或结账。每个目录商品的 MOQ 均为 1，展示价格为工厂批发参考价；买家只能提交询盘，包装、物流和最终交易条款线下确认。

公开销售联系方式：

- WhatsApp：`+86 199 2877 7176`
- 邮箱：`boardgame_01@outlook.com`

## 当前数据

- 572 个商品
- 897 个 SKU
- 英文商品标题和英文 SKU 名称
- 商品主图、商品图集、SKU 图片
- 2,173 个 R2 托管的去重图片文件（约 606 MB，原始链接失效后仍可显示）
- USD 展示价，已在表内美元成本基础上加价 25%

数据文件：`public/products.json`

## 本地运行与检查

```bash
npm install
npm test
npm run check
npx wrangler d1 migrations apply DB --local
npm run dev
```

本地目录页面读取静态 JSON；询盘表单写入 Cloudflare D1 的 `inquiries` 表。

## Cloudflare 部署

首次部署前需要登录 Cloudflare，并创建或连接 D1 数据库：

```bash
npx wrangler login
npx wrangler d1 create desktop-game
```

把命令返回的 `database_id` 和 `database_name` 写入 `wrangler.jsonc`，然后：

```bash
npx wrangler d1 migrations apply DB --remote
npx wrangler deploy
```

Wrangler 会返回 `https://desktop-game.<你的子域>.workers.dev` 网站地址。

## 当前线上地址

- GitHub：`git@github.com:jayce1005/deskgame.git`
- 主域名：`https://boardgameb2b.com`
- Worker 地址：`https://desktop-game.ocbinks.workers.dev`（301 跳转到主域名，避免 SEO 重复内容）

部署方式与 UOUDIO 日本官网项目一致：先推送 `main` 到 GitHub，再使用已登录的 Wrangler 执行 `npm run deploy`。该命令会先应用 D1 数据库迁移，再部署 Worker 和静态商品目录。

## Google Search Console

- 网站资源：`https://boardgameb2b.com/`
- Sitemap：`https://boardgameb2b.com/sitemap.xml`
- `robots.txt`：`https://boardgameb2b.com/robots.txt`

Sitemap 自动包含首页、全部商品独立页面与每个商品的主图。产品更新并重新部署后，不需要手工生成文件；同一个 Sitemap 地址会自动返回最新版内容。

## 更新下一批商品

继续用相同插件导出新表并交给 Codex 即可。每批更新都要先核对商品名称与主图、SKU 名称与 SKU 图片，再生成暂存 JSON；随后运行 `scripts/archive-catalog-images.mjs` 下载新增图片到该批临时目录。不要直接把未核对的机器翻译或外部图片链接上传。

## 独立云端图片库（2026-09-08 起）

- R2 标准存储桶：`boardgameb2b-images`，只存公开商品图片；不存进货成本、供应商来源或待审核资料。
- 图片域名：`https://images.boardgameb2b.com`，HTTPS；R2 对外出口流量免费，存储和请求超出免费额度会计费。
- 图片清单：`scripts/catalog-images.json`，保留文件名、完整 SHA-256、字节数和 MIME 类型。图片按内容哈希去重；禁止用不同内容覆盖相同文件名。
- 旧的 `https://boardgameb2b.com/images/catalog/...` 地址由 Worker 301 跳转，保留旧链接和搜索引擎入口。
- `public/.assetsignore` 排除所有商品图片，更新网站不会重新上传图片，也不会删除 R2 文件。本地预览通过云端域名加载商品图片，需要联网。
- `.catalog-imports/r2-migration-20260908/` 保存上传断点和核验凭据，不提交 Git。凭据中没有登录令牌。
- 不再提交图片到 Git。已有 Git 历史保持原样，不强制推送，不重写历史。

新增图片的重复工作流程（将 `BATCH_IMAGES` 替换为本批暂存目录）：

```bash
node scripts/r2-catalog-images.mjs prepare BATCH_IMAGES
node scripts/r2-catalog-images.mjs upload BATCH_IMAGES
node scripts/r2-catalog-images.mjs verify
# 云端逐张 SHA-256 核验通过后，才安装审核通过的商品 JSON。
node scripts/r2-catalog-images.mjs install
npm test
npm run check
# 仅在有发布授权时提交、推送并部署，然后核验：
node scripts/r2-catalog-images.mjs verify-site
```

`prepare` 保留旧清单，只加入本批新增图片；`upload` 按上传凭据跳过已完成文件；`verify` 从独立域名下载并逐张核对真实字节。不要删除去重记录、待审核图片或源表。

迁移后的本地清理：`node scripts/r2-catalog-images.mjs cleanup` 仅删除清单中经云端核验、且网站切换验证通过的 `public/images/catalog` 副本；不会删除 R2、Git 历史、品牌图片或未审核资料。临时批次目录的清理必须另行确认精确文件，不能递归删除工作区。
