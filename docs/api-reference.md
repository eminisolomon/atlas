# API Reference

## Core Functions

### getCountries()

Get all countries with their complete data.

```typescript
function getCountries(): readonly Country[];
```

**Returns:** Array of all countries

**Example:**

```typescript
const countries = getCountries();
console.log(countries.length); // 250
```

---

### getCountry(name)

Get a specific country by name (case-insensitive).

```typescript
function getCountry(name: string): Country | undefined;
```

**Parameters:**

- `name` - Country name

**Returns:** Country object or undefined if not found

**Example:**

```typescript
const nigeria = getCountry('Nigeria');
console.log(nigeria?.currency); // 'NGN'
console.log(nigeria?.emoji); // '🇳🇬'
```

---

### getStates(countryName)

Get all states/provinces for a specific country.

```typescript
function getStates(countryName: string): readonly State[] | undefined;
```

**Parameters:**

- `countryName` - Name of the country

**Returns:** Array of states or undefined if country not found

**Example:**

```typescript
const states = getStates('United States');
console.log(states?.length); // 66
```

---

### getState(countryName, stateName)

Get a specific state/province from a country.

```typescript
function getState(countryName: string, stateName: string): State | undefined;
```

**Parameters:**

- `countryName` - Name of the country
- `stateName` - Name of the state

**Returns:** State object or undefined if not found

**Example:**

```typescript
const lagos = getState('Nigeria', 'Lagos');
console.log(lagos?.cities.includes('Ikeja')); // true
```

---

### getCities(countryName, stateName)

Get cities for a specific state in a country.

```typescript
function getCities(
  countryName: string,
  stateName: string
): readonly string[] | undefined;
```

**Parameters:**

- `countryName` - Name of the country
- `stateName` - Name of the state

**Returns:** Array of city names or undefined

**Example:**

```typescript
const cities = getCities('Nigeria', 'Lagos');
console.log(cities); // ['Apapa', 'Ikeja', ...]
```

---

## Search Functions

### searchCountries(query)

Search for countries by name with accent-insensitive ranked matching.

```typescript
function searchCountries(query: string): Country[];
```

**Parameters:**

- `query` - Search query

**Returns:** Array of matching countries

**Example:**

```typescript
const results = searchCountries('united');
// Returns countries with 'united' in their name
```

```typescript
const fuzzyResults = searchCountries('untd');
console.log(fuzzyResults.some(country => country.name === 'United States')); // true
```

---

### searchStates(query)

Search for states globally across all countries.

```typescript
function searchStates(query: string): StateSearchResult[];
```

**Parameters:**

- `query` - Search query

**Returns:** Array of results with country and state info

**Example:**

```typescript
const results = searchStates('california');
console.log(results[0].country); // 'United States'
```

---

### searchCities(query)

Search for cities globally across all countries and states.

```typescript
function searchCities(query: string): CitySearchResult[];
```

**Parameters:**

- `query` - Search query

**Returns:** Array of results with country, state, and city info

**Example:**

```typescript
const results = searchCities('lagos');
console.log(results[0]);
// { country: 'Nigeria', state: 'Lagos', city: 'Ikeja' }
```

---

## TypeScript Types

### Country

```typescript
interface Country {
  readonly id: number;
  readonly name: string;
  readonly currency: string;
  readonly emoji: string;
  readonly states: readonly State[];
}
```

### State

```typescript
interface State {
  readonly id: number;
  readonly name: string;
  readonly cities: readonly string[];
}
```

### CitySearchResult

```typescript
interface CitySearchResult {
  readonly country: string;
  readonly state: string;
  readonly city: string;
}
```

### StateSearchResult

```typescript
interface StateSearchResult {
  readonly country: string;
  readonly state: State;
}
```
