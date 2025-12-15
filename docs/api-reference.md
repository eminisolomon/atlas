# API Reference

## Core Functions

### getCountries()

Get all countries with their complete data.

```typescript
function getCountries(): Country[];
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
const nigeria = getCountry("Nigeria");
console.log(nigeria?.currency); // 'NGN'
console.log(nigeria?.emoji); // '🇳🇬'
```

---

### getStates(countryName)

Get all states/provinces for a specific country.

```typescript
function getStates(countryName: string): State[] | undefined;
```

**Parameters:**

- `countryName` - Name of the country

**Returns:** Array of states or undefined if country not found

**Example:**

```typescript
const states = getStates("United States");
console.log(states?.length); // 66
```

---

### getCities(countryName, stateName)

Get cities for a specific state in a country.

```typescript
function getCities(
  countryName: string,
  stateName: string
): string[] | undefined;
```

**Parameters:**

- `countryName` - Name of the country
- `stateName` - Name of the state

**Returns:** Array of city names or undefined

**Example:**

```typescript
const cities = getCities("Nigeria", "Lagos");
console.log(cities); // ['Apapa', 'Ikeja', ...]
```

---

## Search Functions

### searchCountries(query)

Search for countries by name (fuzzy search).

```typescript
function searchCountries(query: string): Country[];
```

**Parameters:**

- `query` - Search query

**Returns:** Array of matching countries

**Example:**

```typescript
const results = searchCountries("united");
// Returns countries with 'united' in their name
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
const results = searchStates("california");
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
const results = searchCities("lagos");
console.log(results[0]);
// { country: 'Nigeria', state: 'Lagos', city: 'Ikeja' }
```

---

## TypeScript Types

### Country

```typescript
interface Country {
  id: number;
  name: string;
  currency: string;
  emoji: string;
  states: State[];
}
```

### State

```typescript
interface State {
  id: number;
  name: string;
  cities: string[];
}
```

### CitySearchResult

```typescript
interface CitySearchResult {
  country: string;
  state: string;
  city: string;
}
```

### StateSearchResult

```typescript
interface StateSearchResult {
  country: string;
  state: State;
}
```
