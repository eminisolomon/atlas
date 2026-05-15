import assert from 'node:assert/strict';
import {
  getCountries,
  getCountry,
  getState,
  getStates,
  getCities,
  searchCountries,
  searchStates,
  searchCities,
} from '../src/index';
import type { Country } from '../src/index';

function assertDefined<T>(
  value: T,
  message?: string
): asserts value is NonNullable<T> {
  assert.notEqual(value, undefined, message);
  assert.notEqual(value, null, message);
}

describe('Global Atlas Package', () => {
  it('should return all countries', () => {
    const countries = getCountries();
    assert.ok(Array.isArray(countries));
    assert.ok(countries.length > 0);
  });

  it('should get a specific country by name (case-insensitive)', () => {
    const country = getCountry('nigeria');
    assertDefined(country);
    assert.equal(country.name, 'Nigeria');
    assert.equal(country.currency, 'NGN');
  });

  it('should return undefined for non-existent country', () => {
    const country = getCountry('Atlantis');
    assert.equal(country, undefined);
  });

  it('should get states for a country', () => {
    const states = getStates('Nigeria');
    assertDefined(states);
    assert.ok(states.length > 0);
    const lagos = states.find(s => s.name === 'Lagos');
    assertDefined(lagos);
  });

  it('should get a specific state from a country', () => {
    const state = getState('Nigeria', 'Lagos');
    assertDefined(state);
    assert.equal(state.name, 'Lagos');
    assert.ok(state.cities.includes('Ikeja'));
  });

  it('should include expanded major towns for Nigeria', () => {
    const kano = getState('Nigeria', 'Kano');
    const oyo = getState('Nigeria', 'Oyo');
    const abia = getState('Nigeria', 'Abia');
    const akwaIbom = getState('Nigeria', 'Akwa Ibom');
    const bayelsa = getState('Nigeria', 'Bayelsa');
    const crossRiver = getState('Nigeria', 'Cross River');
    const enugu = getState('Nigeria', 'Enugu');
    const imo = getState('Nigeria', 'Imo');
    const zamfara = getState('Nigeria', 'Zamfara');
    const abujaFct = getState('Nigeria', 'Abuja Federal Capital Territory');

    assertDefined(kano);
    assertDefined(oyo);
    assertDefined(abia);
    assertDefined(akwaIbom);
    assertDefined(bayelsa);
    assertDefined(crossRiver);
    assertDefined(enugu);
    assertDefined(imo);
    assertDefined(zamfara);
    assertDefined(abujaFct);

    assert.ok(kano.cities.includes('Wudil'));
    assert.ok(oyo.cities.includes('Iseyin'));
    assert.ok(abia.cities.includes('Akwete'));
    assert.ok(!abia.cities.includes('Umuahia North'));
    assert.ok(akwaIbom.cities.includes('Afaha Offiong'));
    assert.ok(akwaIbom.cities.includes('Urue Offong'));
    assert.ok(!akwaIbom.cities.includes('Nsit-Ibom'));
    assert.ok(!akwaIbom.cities.includes('Urue-Offong/Oruko'));
    assert.ok(bayelsa.cities.includes('Twon Brass'));
    assert.ok(!bayelsa.cities.includes('Twon-Brass'));
    assert.ok(crossRiver.cities.includes('Akamkpa'));
    assert.ok(!crossRiver.cities.includes('Akankpa'));
    assert.ok(enugu.cities.includes('Obolo-Eke'));
    assert.ok(!enugu.cities.includes('Obolo-Eke (1)'));
    assert.ok(!enugu.cities.includes('Enugu East'));
    assert.ok(!imo.cities.includes('Owerri Municipal'));
    assert.ok(zamfara.cities.includes('Dansadau'));
    assert.ok(!zamfara.cities.includes('Dan Sadau'));
    assert.ok(abujaFct.cities.includes('Abaji'));
    assert.ok(!abujaFct.cities.includes('Area 10'));
  });

  it('should get cities for a state', () => {
    const cities = getCities('Nigeria', 'Lagos');
    assertDefined(cities);
    assert.ok(cities.length > 0);
    assert.ok(cities.includes('Ikeja'));
  });

  it('should search countries', () => {
    const results = searchCountries('united');
    assert.ok(results.length > 0);
    const usa = results.find(c => c.name === 'United States');
    assertDefined(usa);
  });

  it('should support accent-insensitive city search', () => {
    const results = searchCities('wakhan');
    const match = results.find(result => result.city === 'Wākhān');
    assertDefined(match);
    assert.equal(match.country, 'Afghanistan');
  });

  it('should support ranked fuzzy country search', () => {
    const results = searchCountries('untd');
    const usa = results.find(country => country.name === 'United States');
    assertDefined(usa);
  });

  it('should search states globally', () => {
    const results = searchStates('lags');
    const lagos = results.find(result => result.state.name === 'Lagos');
    assertDefined(lagos);
    assert.equal(lagos.country, 'Nigeria');
  });

  it('should return no search results for empty queries', () => {
    assert.deepEqual(searchCountries('   '), []);
    assert.deepEqual(searchStates('   '), []);
    assert.deepEqual(searchCities('   '), []);
  });

  it('should expose immutable source data', () => {
    const countries = getCountries();
    const nigeria = getCountry('Nigeria');

    assertDefined(nigeria);
    assert.equal(Object.isFrozen(countries), true);
    assert.equal(Object.isFrozen(nigeria), true);
    assert.equal(Object.isFrozen(nigeria.states), true);
    assert.equal(Object.isFrozen(nigeria.states[0].cities), true);

    assert.throws(() => {
      (countries as Country[]).push(nigeria);
    }, TypeError);

    assert.throws(() => {
      (nigeria as unknown as { name: string }).name = 'Changed';
    }, TypeError);
  });
});
