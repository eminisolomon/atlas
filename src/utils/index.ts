/**
 * Normalize input for accent-insensitive comparisons.
 * @param input - The string to normalize
 * @returns Normalized string
 */
export function normalize(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function getSubsequencePenalty(value: string, query: string): number {
  let valueIndex = 0;
  let queryIndex = 0;
  let gapCount = 0;
  let firstMatchIndex = -1;
  let lastMatchIndex = -1;

  while (valueIndex < value.length && queryIndex < query.length) {
    if (value[valueIndex] === query[queryIndex]) {
      if (firstMatchIndex === -1) {
        firstMatchIndex = valueIndex;
      }
      lastMatchIndex = valueIndex;
      queryIndex += 1;
    } else if (firstMatchIndex !== -1) {
      gapCount += 1;
    }

    valueIndex += 1;
  }

  if (
    queryIndex !== query.length ||
    firstMatchIndex === -1 ||
    lastMatchIndex === -1
  ) {
    return -1;
  }

  return gapCount + (lastMatchIndex - firstMatchIndex + 1 - query.length);
}

/**
 * Score a label for ranked partial and fuzzy-like matching.
 * Returns -1 when there is no match.
 */
export function getSearchScore(label: string, query: string): number {
  const normalizedLabel = normalize(label);
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return -1;
  }

  if (normalizedLabel === normalizedQuery) {
    return 1000;
  }

  const words = normalizedLabel.split(' ');

  if (words.includes(normalizedQuery)) {
    return 950;
  }

  if (normalizedLabel.startsWith(normalizedQuery)) {
    return 900 - Math.min(normalizedLabel.length - normalizedQuery.length, 100);
  }

  if (words.some(word => word.startsWith(normalizedQuery))) {
    return 850;
  }

  const includesIndex = normalizedLabel.indexOf(normalizedQuery);
  if (includesIndex !== -1) {
    return 700 - includesIndex;
  }

  const subsequencePenalty = getSubsequencePenalty(
    normalizedLabel,
    normalizedQuery
  );

  if (subsequencePenalty !== -1) {
    return 500 - Math.min(subsequencePenalty, 250);
  }

  return -1;
}
