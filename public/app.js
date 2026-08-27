const grid = document.querySelector("#productGrid");
const status = document.querySelector("#catalogStatus");
const search = document.querySelector("#searchInput");
const summary = document.querySelector("#catalogSummary");
const pagination = document.querySelector("#pagination");
const productDialog = document.querySelector("#productDialog");
const dialogContent = document.querySelector("#dialogContent");
const inquiryDialog = document.querySelector("#inquiryDialog");
const inquiryForm = document.querySelector("#inquiryForm");
const inquiryProduct = document.querySelector("#inquiryProduct");
const inquiryStatus = document.querySelector("#inquiryStatus");
const inquirySubmit = document.querySelector("#inquirySubmit");
let products = [];
let currentProduct = null;
let currentPage = 1;
const PAGE_SIZE = 100;

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

function safeImage(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch { return ""; }
}

function usd(value) {
  return `$${Number(value).toFixed(2)}`;
}

function card(product) {
  const image = safeImage(product.mainImage);
  return `<article class="product-card-wrap"><a class="product-card" href="/products/${encodeURIComponent(product.slug)}" aria-label="View ${escapeHtml(product.title)}" data-slug="${escapeHtml(product.slug)}">
    <div class="image-wrap">
      ${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(`${product.title} wholesale product`)}" width="480" height="480" loading="lazy" referrerpolicy="no-referrer">` : ""}
      <span class="view-mark">↗</span>
    </div>
    <div class="card-meta">
      <h3>${escapeHtml(product.title)}</h3>
      <strong>${usd(product.priceUsd)}</strong>
      <p>${product.skus?.length || 0} ${product.skus?.length === 1 ? "variant" : "variants"} · reference price</p>
    </div>
  </a></article>`;
}

function catalogMatches() {
  const query = search.value.trim().toLowerCase();
  if (!query) return products;
  return products.filter((product) => `${product.title} ${(product.skus || []).map((sku) => sku.name).join(" ")}`.toLowerCase().includes(query));
}

function pageButton(label, page, options = {}) {
  const { active = false, disabled = false, ariaLabel = "" } = options;
  return `<button type="button" data-page="${page}"${active ? ' class="active" aria-current="page"' : ""}${disabled ? " disabled" : ""}${ariaLabel ? ` aria-label="${ariaLabel}"` : ""}>${label}</button>`;
}

function render() {
  const list = catalogMatches();
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  currentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = list.slice(start, start + PAGE_SIZE);

  status.hidden = list.length > 0;
  if (!list.length) status.textContent = products.length ? "No products match your search." : "The catalog is being prepared.";
  summary.hidden = !list.length;
  summary.textContent = list.length ? `Showing ${start + 1}–${start + visible.length} of ${list.length} products · MOQ 1 on every product` : "";
  grid.innerHTML = visible.map(card).join("");

  if (totalPages <= 1 || !list.length) {
    pagination.innerHTML = "";
    return;
  }
  pagination.innerHTML = [
    pageButton("← Previous", currentPage - 1, { disabled: currentPage === 1, ariaLabel: "Previous catalog page" }),
    ...Array.from({ length: totalPages }, (_, index) => pageButton(String(index + 1), index + 1, { active: currentPage === index + 1, ariaLabel: `Catalog page ${index + 1}` })),
    pageButton("Next →", currentPage + 1, { disabled: currentPage === totalPages, ariaLabel: "Next catalog page" }),
  ].join("");
}

function skuCard(sku) {
  const image = safeImage(sku.image);
  return `<article class="sku">
    ${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(sku.name)}" loading="lazy" referrerpolicy="no-referrer">` : ""}
    <span><strong>${escapeHtml(sku.name)}</strong><small>${usd(sku.priceUsd)} reference price</small></span>
  </article>`;
}

function gallery(product) {
  const images = [...new Set([product.mainImage, ...(product.images || [])].map(safeImage).filter(Boolean))];
  const main = images[0] || "";
  return `<div class="detail-gallery">
    <div class="detail-image">${main ? `<img id="detailMainImage" src="${escapeHtml(main)}" alt="${escapeHtml(product.title)}" referrerpolicy="no-referrer">` : ""}</div>
    ${images.length > 1 ? `<div class="gallery-thumbs" aria-label="Product images">${images.map((image, index) => `<button class="gallery-thumb${index === 0 ? " active" : ""}" type="button" data-image="${escapeHtml(image)}" aria-label="View image ${index + 1}"><img src="${escapeHtml(image)}" alt="" loading="lazy" referrerpolicy="no-referrer"></button>`).join("")}</div>` : ""}
  </div>`;
}

function openProduct(product) {
  currentProduct = product;
  dialogContent.innerHTML = `<article class="product-detail">
    ${gallery(product)}
    <div class="detail-copy">
      <span class="kicker">Wholesale catalog</span>
      <h2 id="productDialogTitle">${escapeHtml(product.title)}</h2>
      <div><span class="detail-price">${usd(product.priceUsd)}</span><span class="detail-note">reference price</span></div>
      <h3 class="sku-title">Available variants</h3>
      <div class="sku-list">${(product.skus || []).map(skuCard).join("")}</div>
      <div class="reference-note"><strong>MOQ 1:</strong> the displayed factory wholesale reference price is available from one unit. Packaging, freight and final terms are confirmed after inquiry.</div>
      <button class="inquiry-button product-inquiry" type="button">Send inquiry <span>↗</span></button>
    </div>
  </article>`;
  productDialog.showModal();
  history.replaceState(null, "", `#product=${encodeURIComponent(product.slug)}`);
}

function openInquiry(product = null) {
  currentProduct = product;
  inquiryForm.reset();
  inquiryStatus.textContent = "";
  document.querySelector("#inquiryProductId").value = product?.id || "";
  document.querySelector("#inquiryProductTitle").value = product?.title || "";
  inquiryProduct.hidden = !product;
  inquiryProduct.textContent = product ? `Selected product: ${product.title}` : "";
  if (productDialog.open) productDialog.close();
  inquiryDialog.showModal();
}

grid.addEventListener("click", (event) => {
  const element = event.target.closest("[data-slug]");
  const product = products.find((item) => item.slug === element?.dataset.slug);
  if (!product || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  openProduct(product);
});

dialogContent.addEventListener("click", (event) => {
  const thumb = event.target.closest("[data-image]");
  if (thumb) {
    const main = document.querySelector("#detailMainImage");
    if (main) main.src = thumb.dataset.image;
    document.querySelectorAll(".gallery-thumb").forEach((item) => item.classList.toggle("active", item === thumb));
  }
  if (event.target.closest(".product-inquiry")) openInquiry(currentProduct);
});

document.querySelector("#productDialog .dialog-close").addEventListener("click", () => productDialog.close());
document.querySelector(".inquiry-close").addEventListener("click", () => inquiryDialog.close());
for (const item of [productDialog, inquiryDialog]) {
  item.addEventListener("click", (event) => { if (event.target === item) item.close(); });
}
productDialog.addEventListener("close", () => {
  if (!inquiryDialog.open) history.replaceState(null, "", "#catalog");
});
document.querySelectorAll(".inquiry-trigger").forEach((button) => button.addEventListener("click", () => openInquiry()));

search.addEventListener("input", () => {
  currentPage = 1;
  render();
});

pagination.addEventListener("click", (event) => {
  const button = event.target.closest("[data-page]");
  if (!button || button.disabled) return;
  currentPage = Number(button.dataset.page);
  render();
  document.querySelector("#catalog").scrollIntoView({ behavior: "smooth", block: "start" });
});

inquiryForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  inquirySubmit.disabled = true;
  inquiryStatus.textContent = "Sending…";
  const payload = Object.fromEntries(new FormData(inquiryForm));
  try {
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Unable to send inquiry");
    inquiryForm.querySelectorAll("input:not([type=hidden]), textarea").forEach((field) => { field.disabled = true; });
    inquirySubmit.hidden = true;
    inquiryStatus.textContent = `Thank you. Your inquiry has been received${result.reference ? ` (reference ${result.reference})` : ""}.`;
  } catch (error) {
    inquiryStatus.textContent = error instanceof Error ? error.message : "Unable to send inquiry. Please try again.";
  } finally {
    inquirySubmit.disabled = false;
  }
});

inquiryDialog.addEventListener("close", () => {
  inquirySubmit.hidden = false;
  inquiryForm.querySelectorAll("input, textarea").forEach((field) => { field.disabled = false; });
  if (location.search.includes("inquiry=")) history.replaceState(null, "", "/#catalog");
});

async function loadProducts() {
  try {
    const response = await fetch("/products.json");
    if (!response.ok) throw new Error(`Catalog request failed (${response.status})`);
    const payload = await response.json();
    products = Array.isArray(payload.products) ? payload.products : [];
    document.querySelector("#productCount").textContent = String(products.length).padStart(2, "0");
    render();
    const slug = new URLSearchParams(location.hash.replace(/^#/, "")).get("product");
    const selected = products.find((product) => product.slug === slug);
    if (selected) openProduct(selected);
    const inquiryId = new URLSearchParams(location.search).get("inquiry");
    const inquirySelection = products.find((product) => product.id === inquiryId);
    if (inquiryId) openInquiry(inquirySelection || null);
  } catch (error) {
    status.hidden = false;
    status.textContent = "The catalog is temporarily unavailable.";
    console.error(error);
  }
}

document.querySelector("#year").textContent = new Date().getFullYear();
loadProducts();
