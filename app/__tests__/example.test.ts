import { describe, expect, it } from 'vitest';

import { cn } from '~/lib/utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('keeps non-conflicting classes', () => {
    expect(cn('font-bold', 'text-sm')).toBe('font-bold text-sm');
  });
});
