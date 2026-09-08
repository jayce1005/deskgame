import { describe, expect, it } from 'vitest';
import { referencePriceUsd } from '../scripts/catalog-pricing.mjs';
describe('Per-batch USD markup', () => {
  it('applies 45% without currency conversion', () => {
    expect(referencePriceUsd(10,45)).toBe(14.5);
    expect(referencePriceUsd(2.24,45)).toBe(3.25);
    expect(referencePriceUsd(4.48,45)).toBe(6.5);
    expect(referencePriceUsd(0.3,45)).toBe(0.44);
    expect(referencePriceUsd(0.1,45)).toBe(0.15);
  });
  it('keeps the existing 25% rule explicit and rejects invalid inputs', () => {
    expect(referencePriceUsd(10,25)).toBe(12.5);
    for (const cost of [0,-1,NaN,Infinity]) expect(()=>referencePriceUsd(cost,45)).toThrow();
    expect(()=>referencePriceUsd(10,NaN)).toThrow();
  });
});
