import { locationData } from '../data';
import { Country, State, StateSearchResult } from '../interfaces';
import { normalize } from '../utils';
import { getCountry } from './country';

/**
 * Get all states for a specific country
 * @param countryName - Name of the country
 * @returns Array of states or undefined if country not found
 */
export function getStates(countryName: string): State[] | undefined {
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
  if (!query) return [];
  const normalizedQuery = normalize(query);
  const results: StateSearchResult[] = [];

  (locationData as Country[]).forEach(country => {
    country.states.forEach(state => {
      if (normalize(state.name).includes(normalizedQuery)) {
        results.push({
          country: country.name,
          state,
        });
      }
    });
  });

  return results;
}
