# @xinnovations/atlas

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A modern, type-safe TypeScript library for World countries, states, and cities with **zero dependencies**.

## Features

- 🎯 **TypeScript First** - Full type safety with comprehensive type definitions
- 📦 **Zero Dependencies** - Lightweight and fast
- 🌍 **Global Data** - Countries, states, and cities worldwide
- 🔍 **Powerful Search** - Find locations by fuzzy search
- ✅ **Well Tested** - Verified reliability

## Installation

```bash
npm install @xinnovations/atlas
```

## Quick Start

```typescript
import { getStates, getCities, searchCountries } from '@xinnovations/atlas';

// Get states for a country
const states = getStates('United States');
console.log(states);

// Get cities for a state
const cities = getCities('Nigeria', 'Lagos');
console.log(cities); // ['Ikeja', 'Lekki', ...]

// Search for a country
const results = searchCountries('united');
console.log(results);
```

## Available Functions

### Core Functions

`getCountries()` · `getCountry(name)` · `getStates(country)` · `getCities(country, state)`

### Search Functions

`searchCountries(query)` · `searchStates(query)` · `searchCities(query)`

## Documentation

📚 **[Full Documentation](docs)** - Comprehensive guides and API reference (Coming Soon)

🤝 **[Contributing](CONTRIBUTING.md)** - Help improve this package

## TypeScript Support

```typescript
import type { Country, State } from '@xinnovations/atlas';

const country: Country | undefined = getCountry('Canada');
```

## License

MIT © [Solomon Olatunji](https://github.com/eminisolomon)

---

**Made with ❤️ in Nigeria** 🇳🇬 **for the World** 🌍
