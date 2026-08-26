export interface InquiryInput {
  productId: string;
  productTitle: string;
  name: string;
  email: string;
  company: string;
  message: string;
  website: string;
}

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength)
    : "";
}

export function parseInquiry(value: unknown): InquiryInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid inquiry data");
  const record = value as Record<string, unknown>;
  const inquiry: InquiryInput = {
    productId: cleanText(record.productId, 80),
    productTitle: cleanText(record.productTitle, 180),
    name: cleanText(record.name, 100),
    email: cleanText(record.email, 254).toLowerCase(),
    company: cleanText(record.company, 160),
    message: cleanText(record.message, 2_000),
    website: cleanText(record.website, 300),
  };

  if (inquiry.website) return inquiry;
  if (inquiry.name.length < 2) throw new Error("Name is required");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) throw new Error("A valid email is required");
  if (inquiry.message.length < 10) throw new Error("Message must be at least 10 characters");
  return inquiry;
}
