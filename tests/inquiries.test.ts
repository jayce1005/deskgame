import { describe, expect, it } from "vitest";
import { parseInquiry } from "../src/inquiries";

describe("parseInquiry", () => {
  it("normalizes a valid inquiry", () => {
    expect(parseInquiry({
      productId: " P1 ",
      productTitle: " Sample  Product ",
      name: " Ada Buyer ",
      email: " ADA@EXAMPLE.COM ",
      company: " Example Ltd ",
      message: " Please quote 500 pieces. ",
    })).toMatchObject({
      productId: "P1",
      productTitle: "Sample Product",
      name: "Ada Buyer",
      email: "ada@example.com",
      company: "Example Ltd",
      message: "Please quote 500 pieces.",
    });
  });

  it("rejects invalid contact information", () => {
    expect(() => parseInquiry({ name: "A", email: "wrong", message: "short" })).toThrow();
  });

  it("accepts a filled honeypot without processing the other fields", () => {
    expect(parseInquiry({ website: "https://spam.example" }).website).toBe("https://spam.example");
  });
});
