import { locationData } from '../data';
import { Country, CitySearchResult } from '../interfaces';
import { normalize } from '../utils';
import { getState } from './state';

/**
 * Get cities for a specific state in a country
 * @param countryName - Name of the country
 * @param stateName - Name of the state
 * @returns Array of city names or undefined
 */
export function getCities(
  countryName: string,
  stateName: string
): string[] | undefined {
  const state = getState(countryName, stateName);
  return state?.cities;
}

/**
 * Search for cities globally
 * @param query - Search query
 * @returns Array of results with country and state info
 */
export function searchCities(query: string): CitySearchResult[] {
  if (!query) return [];
  const normalizedQuery = normalize(query);
  const results: CitySearchResult[] = [];

  (locationData as Country[]).forEach(country => {
    country.states.forEach(state => {
      state.cities.forEach(city => {
        if (normalize(city).includes(normalizedQuery)) {
          results.push({
            country: country.name,
            state: state.name,
            city,
          });
        }
      });
    });
  });

  return results;
}
