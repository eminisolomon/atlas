import { locationData } from './countryData';
import {
  Country,
  State,
  CitySearchResult,
  StateSearchResult,
} from './interface';

/**
 * Normalize input string to lowercase and trim whitespace
 * @param input - The string to normalize
 * @returns Normalized string
 */
function normalize(input: string): string {
  return input.toLowerCase().trim();
}

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

export {
  Country,
  State,
  CitySearchResult,
  StateSearchResult,
} from './interface';
