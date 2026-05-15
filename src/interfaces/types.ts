/**
 * Represents a state/province within a country
 */
export interface State {
  readonly id: number;
  readonly name: string;
  readonly cities: readonly string[];
}

/**
 * Represents a country with its metadata and states
 */
export interface Country {
  readonly id: number;
  readonly name: string;
  readonly currency: string;
  readonly emoji: string;
  readonly states: readonly State[];
}

/**
 * Search result for city queries
 */
export interface CitySearchResult {
  readonly country: string;
  readonly state: string;
  readonly city: string;
}

/**
 * Search result for state queries
 */
export interface StateSearchResult {
  readonly country: string;
  readonly state: State;
}
