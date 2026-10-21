export interface JitterRange {
  min: number;
  max: number;
}

export const DEFAULT_JITTER: JitterRange = { min: 0, max: 12 };

export const SEARCH_JITTER: JitterRange = { min: 5, max: 40 };

function randomJitter(range: JitterRange): number {
  const span = range.max - range.min + 1;
  return range.min + Math.floor(Math.random() * span);
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export interface ApiOptions {
  jitterMs?: JitterRange;
}

/**
 * Simulates the round trip of the backing API so that the client behaves the
 * same way it does against the real service.
 */
export async function request<T>(path: string, resolve: () => T, options: ApiOptions = {}): Promise<T> {
  const range = options.jitterMs ?? DEFAULT_JITTER;
  const durationMs = randomJitter(range);
  if (durationMs > 0) {
    await delay(durationMs);
  }
  return resolve();
}
