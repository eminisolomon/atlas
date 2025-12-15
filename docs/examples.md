# Examples

## Basic Examples

### List All Countries

```typescript
import { getCountries } from '@xinnovations/atlas';

const countries = getCountries();
countries.forEach(country => {
  console.log(`${country.emoji} ${country.name} (${country.currency})`);
});
```

### Find Country by Name

```typescript
import { getCountry } from '@xinnovations/atlas';

const country = getCountry('Japan');
if (country) {
  console.log(`Currency: ${country.currency}`);
  console.log(`States: ${country.states.length}`);
}
```

### Get All States in a Country

```typescript
import { getStates } from '@xinnovations/atlas';

const states = getStates('Canada');
if (states) {
  states.forEach(state => {
    console.log(`${state.name} - ${state.cities.length} cities`);
  });
}
```

### Get Cities in a State

```typescript
import { getCities } from '@xinnovations/atlas';

const cities = getCities('Nigeria', 'Lagos');
if (cities) {
  console.log(`Lagos has ${cities.length} cities:`);
  cities.forEach(city => console.log(`- ${city}`));
}
```

## Search Examples

### Search for Countries

```typescript
import { searchCountries } from '@xinnovations/atlas';

// Find all countries with "island" in the name
const islandCountries = searchCountries('island');
console.log(islandCountries.map(c => c.name));
// ['Åland Islands', 'Cayman Islands', 'Cook Islands', ...]
```

### Search for States Globally

```typescript
import { searchStates } from '@xinnovations/atlas';

// Find all states named "Victoria"
const victoriaStates = searchStates('victoria');
victoriaStates.forEach(result => {
  console.log(`${result.state.name} in ${result.country}`);
});
```

### Search for Cities Globally

```typescript
import { searchCities } from '@xinnovations/atlas';

// Find all cities named "Paris"
const parisCities = searchCities('paris');
parisCities.forEach(result => {
  console.log(`${result.city} in ${result.state}, ${result.country}`);
});
```

## React Example

```tsx
import { useState, useEffect } from 'react';
import { getCountries, getStates, type Country } from '@xinnovations/atlas';

function CountrySelector() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [states, setStates] = useState<string[]>([]);

  useEffect(() => {
    setCountries(getCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const countryStates = getStates(selectedCountry);
      setStates(countryStates?.map(s => s.name) || []);
    }
  }, [selectedCountry]);

  return (
    <div>
      <select onChange={e => setSelectedCountry(e.target.value)}>
        <option value="">Select a country</option>
        {countries.map(country => (
          <option key={country.id} value={country.name}>
            {country.emoji} {country.name}
          </option>
        ))}
      </select>

      {states.length > 0 && (
        <select>
          <option value="">Select a state</option>
          {states.map(state => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
```

## Vue Example

```vue
<template>
  <div>
    <select v-model="selectedCountry">
      <option value="">Select a country</option>
      <option
        v-for="country in countries"
        :key="country.id"
        :value="country.name"
      >
        {{ country.emoji }} {{ country.name }}
      </option>
    </select>

    <select v-if="states.length > 0">
      <option value="">Select a state</option>
      <option v-for="state in states" :key="state" :value="state">
        {{ state }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getCountries, getStates, type Country } from '@xinnovations/atlas';

const countries = ref<Country[]>([]);
const selectedCountry = ref('');

const states = computed(() => {
  if (!selectedCountry.value) return [];
  return getStates(selectedCountry.value)?.map(s => s.name) || [];
});

onMounted(() => {
  countries.value = getCountries();
});
</script>
```

## Node.js Example

```javascript
const { getCountries, searchCountries } = require('@xinnovations/atlas');

// List all African countries
const allCountries = getCountries();
const africanCountries = allCountries.filter(
  c =>
    c.name.includes('Africa') ||
    ['Nigeria', 'Ghana', 'Kenya', 'Egypt'].includes(c.name)
);

console.log(
  'African countries:',
  africanCountries.map(c => c.name)
);

// Search functionality
const searchTerm = process.argv[2] || 'united';
const results = searchCountries(searchTerm);
console.log(`Found ${results.length} countries matching "${searchTerm}"`);
results.forEach(c => console.log(`- ${c.emoji} ${c.name}`));
```
