import type { Country } from '../interfaces';
import { countryDataChunk01 } from './generated/chunk01';
import { countryDataChunk02 } from './generated/chunk02';
import { countryDataChunk03 } from './generated/chunk03';
import { countryDataChunk04 } from './generated/chunk04';
import { countryDataChunk05 } from './generated/chunk05';
import { countryDataChunk06 } from './generated/chunk06';
import { countryDataChunk07 } from './generated/chunk07';
import { countryDataChunk08 } from './generated/chunk08';
import { countryDataChunk09 } from './generated/chunk09';
import { countryDataChunk10 } from './generated/chunk10';

function deepFreeze<T>(value: T): T {
  if (Array.isArray(value)) {
    value.forEach(item => {
      deepFreeze(item);
    });

    return Object.freeze(value) as T;
  }

  if (value && typeof value === 'object') {
    Object.values(value as Record<string, unknown>).forEach(item => {
      deepFreeze(item);
    });

    return Object.freeze(value) as T;
  }

  return value;
}

const combinedLocationData: Country[] = [
  ...countryDataChunk01,
  ...countryDataChunk02,
  ...countryDataChunk03,
  ...countryDataChunk04,
  ...countryDataChunk05,
  ...countryDataChunk06,
  ...countryDataChunk07,
  ...countryDataChunk08,
  ...countryDataChunk09,
  ...countryDataChunk10,
];

export const locationData = deepFreeze(
  combinedLocationData
) as readonly Country[];
