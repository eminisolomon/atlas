import { assert } from "chai";
import {
  getCountries,
  getCountry,
  getStates,
  getCities,
  searchCountries,
} from "../src/index";

describe("Global Atlas Package", () => {
  it("should return all countries", () => {
    const countries = getCountries();
    assert.isArray(countries);
    assert.isAbove(countries.length, 0);
  });

  it("should get a specific country by name (case-insensitive)", () => {
    const country = getCountry("nigeria");
    assert.isDefined(country);
    assert.equal(country?.name, "Nigeria");
    assert.equal(country?.currency, "NGN");
  });

  it("should return undefined for non-existent country", () => {
    const country = getCountry("Atlantis");
    assert.isUndefined(country);
  });

  it("should get states for a country", () => {
    const states = getStates("Nigeria");
    assert.isDefined(states);
    assert.isAbove(states!.length, 0);
    const lagos = states!.find((s) => s.name === "Lagos");
    assert.isDefined(lagos);
  });

  it("should get cities for a state", () => {
    const cities = getCities("Nigeria", "Lagos");
    assert.isDefined(cities);
    assert.isAbove(cities!.length, 0);
    assert.include(cities!, "Ikeja");
  });

  it("should search countries", () => {
    const results = searchCountries("united");
    assert.isAbove(results.length, 0);
    const usa = results.find((c) => c.name === "United States");
    assert.isDefined(usa);
  });
});
