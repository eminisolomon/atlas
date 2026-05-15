import { locationData } from '../data';
import { CitySearchResult } from '../interfaces';
import { getSearchScore } from '../utils';
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
): readonly string[] | undefined {
  const state = getState(countryName, stateName);
  return state?.cities;
}

/**
 * Search for cities globally
 * @param query - Search query
 * @returns Array of results with country and state info
 */
export function searchCities(query: string): CitySearchResult[] {
  const results: Array<CitySearchResult & { score: number }> = [];

  locationData.forEach(country => {
    country.states.forEach(state => {
      state.cities.forEach(city => {
        const score = getSearchScore(city, query);

        if (score !== -1) {
          results.push({
            country: country.name,
            state: state.name,
            city,
            score,
          });
        }
      });
    });
  });

  return results
    .sort(
      (left, right) =>
        right.score - left.score ||
        left.city.localeCompare(right.city) ||
        left.state.localeCompare(right.state) ||
        left.country.localeCompare(right.country)
    )
    .map(({ score: _score, ...result }) => result);
}
