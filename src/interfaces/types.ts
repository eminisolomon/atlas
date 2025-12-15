/**
 * Represents a state/province within a country
 */
export interface State {
  id: number;
  name: string;
  cities: string[];
}

/**
 * Represents a country with its metadata and states
 */
export interface Country {
  id: number;
  name: string;
  currency: string;
  emoji: string;
  states: State[];
}

/**
 * Search result for city queries
 */
export interface CitySearchResult {
  country: string;
  state: string;
  city: string;
}

/**
 * Search result for state queries
 */
export interface StateSearchResult {
  country: string;
  state: State;
}
