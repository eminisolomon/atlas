---
layout: home

hero:
  name: '@xinnovations/atlas'
  text: World Location Data
  tagline: Complete data for countries, states, and cities with zero dependencies
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/xinnovations/atlas
    - theme: alt
      text: API Reference
      link: /api-reference

features:
  - icon: 🎯
    title: TypeScript First
    details: Full type safety with comprehensive type definitions and IntelliSense support

  - icon: 📦
    title: Zero Dependencies
    details: Lightweight package with no external dependencies, just pure data and functions

  - icon: 🌍
    title: Global Data
    details: 250 countries with states and cities worldwide

  - icon: 🔍
    title: Powerful Search
    details: Find locations by country, state, or city with accent-insensitive ranked matching

  - icon: 💱
    title: Currency & Emoji
    details: Country currency codes and emoji flags included

  - icon: 📍
    title: Easy to Use
    details: Simple, intuitive API for accessing location data
---

## Quick Example

```typescript
import { getStates, getCities, searchCountries } from '@xinnovations/atlas';

// Get states for a country
const states = getStates('United States');
console.log(states);

// Get cities for a state
const cities = getCities('Nigeria', 'Lagos');
console.log(cities); // ['Apapa', 'Ikeja', ...]

// Search for countries
const results = searchCountries('united');
console.log(results.map(c => c.name));
// ['United Arab Emirates', 'United Kingdom', 'United States', ...]
```

## Installation

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

## What's Included?

### Country Data

- Country names and currency codes
- Emoji flags
- States/provinces
- Cities

### Functions

- Country queries and searches
- State lookups
- City searches
- Accent-insensitive ranked search

## License

MIT © [Solomon Olatunji](https://github.com/eminisolomon)

---

**Made with ❤️ in Nigeria 🇳🇬 for the World 🌍**
