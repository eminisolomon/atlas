import { locationData } from '../data';
import { Country } from '../interfaces';
import { getSearchScore, normalize } from '../utils';

/**
 * Get all countries with their data
 * @returns Array of all countries
 */
export function getCountries(): readonly Country[] {
  return locationData;
}

/**
 * Get a specific country by name
 * @param name - Name of the country
 * @returns Country object or undefined
 */
export function getCountry(name: string): Country | undefined {
  const normalizedName = normalize(name);
  return locationData.find(c => normalize(c.name) === normalizedName);
}

/**
 * Search/Filter countries by name
 * @param query - Search query
 * @returns Array of matching countries
 */
export function searchCountries(query: string): Country[] {
  return locationData
    .map(country => ({
      country,
      score: getSearchScore(country.name, query),
    }))
    .filter(match => match.score !== -1)
    .sort(
      (left, right) =>
        right.score - left.score ||
        left.country.name.localeCompare(right.country.name)
    )
    .map(match => match.country);
}
