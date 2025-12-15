import { locationData } from '../data';
import { Country } from '../interfaces';
import { normalize } from '../utils';

/**
 * Get all countries with their data
 * @returns Array of all countries
 */
export function getCountries(): Country[] {
  return locationData as Country[];
}

/**
 * Get a specific country by name
 * @param name - Name of the country
 * @returns Country object or undefined
 */
export function getCountry(name: string): Country | undefined {
  const normalizedName = normalize(name);
  return (locationData as Country[]).find(
    c => normalize(c.name) === normalizedName
  );
}

/**
 * Search/Filter countries by name
 * @param query - Search query
 * @returns Array of matching countries
 */
export function searchCountries(query: string): Country[] {
  if (!query) return [];
  const normalizedQuery = normalize(query);
  return (locationData as Country[]).filter(c =>
    normalize(c.name).includes(normalizedQuery)
  );
}
