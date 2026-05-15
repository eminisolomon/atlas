import { locationData } from '../data';
import { State, StateSearchResult } from '../interfaces';
import { getSearchScore, normalize } from '../utils';
import { getCountry } from './country';

/**
 * Get all states for a specific country
 * @param countryName - Name of the country
 * @returns Array of states or undefined if country not found
 */
export function getStates(countryName: string): readonly State[] | undefined {
  const country = getCountry(countryName);
  return country?.states;
}

/**
 * Get a specific state from a country
 * @param countryName - Name of the country
 * @param stateName - Name of the state
 * @returns State object or undefined
 */
export function getState(
  countryName: string,
  stateName: string
): State | undefined {
  const country = getCountry(countryName);
  if (!country) return undefined;

  const normalizedStateName = normalize(stateName);
  return country.states.find(s => normalize(s.name) === normalizedStateName);
}

/**
 * Search for states globally
 * @param query - Search query
 * @returns Array of results with country info
 */
export function searchStates(query: string): StateSearchResult[] {
  const results: Array<StateSearchResult & { score: number }> = [];

  locationData.forEach(country => {
    country.states.forEach(state => {
      const score = getSearchScore(state.name, query);

      if (score !== -1) {
        results.push({
          country: country.name,
          state,
          score,
        });
      }
    });
  });

  return results
    .sort(
      (left, right) =>
        right.score - left.score ||
        left.state.name.localeCompare(right.state.name) ||
        left.country.localeCompare(right.country)
    )
    .map(({ score: _score, ...result }) => result);
}
