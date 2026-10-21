import { describe, expect, it } from 'vitest';
import { MAX_ESTIMATE, validateTaskDraft } from '../../src/domain/validation';
import { makeDraft } from '../fixtures/builders';

describe('validateTaskDraft', () => {
  it('accepts a draft with an estimate at the documented maximum', () => {
    const result = validateTaskDraft(makeDraft({ estimate: MAX_ESTIMATE }));

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('rejects a draft with an estimate above the documented maximum', () => {
    const result = validateTaskDraft(makeDraft({ estimate: MAX_ESTIMATE + 1 }));

    expect(result.valid).toBe(false);
    expect(result.errors.join(' ')).toMatch(/between 1 and 13/i);
  });

  it('rejects a draft without a title', () => {
    const result = validateTaskDraft(makeDraft({ title: '   ' }));

    expect(result.valid).toBe(false);
    expect(result.errors.join(' ')).toMatch(/title is required/i);
  });

  it('rejects a draft with a title longer than 120 characters', () => {
    const result = validateTaskDraft(makeDraft({ title: 'x'.repeat(121) }));

    expect(result.valid).toBe(false);
    expect(result.errors.join(' ')).toMatch(/at most 120 characters/i);
  });

  it('rejects a draft with an estimate below one', () => {
    const result = validateTaskDraft(makeDraft({ estimate: 0 }));

    expect(result.valid).toBe(false);
  });

  it('rejects a draft with a fractional estimate', () => {
    const result = validateTaskDraft(makeDraft({ estimate: 2.5 }));

    expect(result.valid).toBe(false);
  });
});
