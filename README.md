# Desktop Game — English B2B Catalog

一个不做在线成交的英文 B2B 产品展示站。当前目录来自 Mercado 插件导出的商品表，共 69 个商品、122 个 SKU。

## 实际工作流程

1. 使用现成的 Mercado/1688 导出插件，批量导出 XLSX 或 CSV 商品表。
2. 把导出文件交给 Codex。
3. Codex 逐项核对商品图与商品标题、SKU 图片与 SKU 名称，然后生成英文名称。
4. 表内价格视为美元进货成本，展示价按 `成本 × 1.25` 计算并保留两位小数。
5. 生成公开的 `public/products.json` 并更新网站。
6. 推送 GitHub 后由 GitHub Actions 部署到 Cloudflare Workers 免费域名。

公开网站不包含进货成本、1688 来源链接、购物车、支付或结账。买家只能提交询盘；最终价格、MOQ、包装、物流和交易条款线下确认。

## 当前数据

- 69 个商品
- 122 个 SKU
- 英文商品标题和英文 SKU 名称
- 商品主图、商品图集、SKU 图片
- USD 展示价，已在表内美元成本基础上加价 25%
- 展示价范围：USD 1.11–7.08

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

## GitHub 自动部署

GitHub Actions 会在 push 到 `main` 后执行测试、类型检查、部署和数据库迁移。仓库设置中需要添加：

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Cloudflare API Token 需要 Workers Scripts 和 D1 的编辑权限。

## 更新下一批商品

继续用相同插件导出新表并交给 Codex即可。每批更新都要先核对商品名称与主图、SKU 名称与 SKU 图片，再覆盖生成公开 JSON；不要直接把未核对的机器翻译上传。
