# Getting Started

## Installation

Install `@xinnovations/atlas` using your preferred package manager:

::: code-group

```bash [npm]
npm install @xinnovations/atlas
```

```bash [yarn]
yarn add @xinnovations/atlas
```

```bash [pnpm]
pnpm add @xinnovations/atlas
```

:::

## Basic Usage

### Import the Library

```typescript
import { getCountries, getStates, getCities } from '@xinnovations/atlas';
```

### Get All Countries

```typescript
const countries = getCountries();
console.log(countries.length); // 250
console.log(countries[0].name); // 'Afghanistan'
```

### Get a Specific Country

```typescript
const nigeria = getCountry('Nigeria');
console.log(nigeria?.currency); // 'NGN'
console.log(nigeria?.emoji); // '🇳🇬'
```

### Get States for a Country

```typescript
const states = getStates('United States');
console.log(states?.length); // 66
```

### Get Cities for a State

```typescript
const cities = getCities('Nigeria', 'Lagos');
console.log(cities); // ['Apapa', 'Ikeja', ...]
```

## Search Functionality

### Search Countries

```typescript
import { searchCountries } from '@xinnovations/atlas';

const results = searchCountries('united');
console.log(results.map(c => c.name));
// ['United Arab Emirates', 'United Kingdom', 'United States', ...]
```

### Search States

```typescript
import { searchStates } from '@xinnovations/atlas';

const results = searchStates('california');
console.log(results[0]);
// { country: 'United States', state: { id: ..., name: 'California', cities: [...] } }
```

### Search Cities

```typescript
import { searchCities } from '@xinnovations/atlas';

const results = searchCities('lagos');
console.log(results);
// [{ country: 'Nigeria', state: 'Lagos', city: 'Ikeja' }, ...]
```

## TypeScript Support

The library is written in TypeScript and provides full type definitions:

```typescript
import type { Country, State, CitySearchResult } from '@xinnovations/atlas';

const country: Country | undefined = getCountry('Canada');
const cities: string[] | undefined = getCities('Nigeria', 'Lagos');
```

## Next Steps

- Check out the [API Reference](/api-reference) for detailed documentation
- See [Examples](/examples) for more use cases
