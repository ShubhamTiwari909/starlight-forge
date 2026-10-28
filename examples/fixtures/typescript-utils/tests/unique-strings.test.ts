import assert from 'node:assert/strict';
import { test } from 'node:test';
import { uniqueStrings } from '../src/index.ts';

test('uniqueStrings removes repeated values and preserves first occurrence order', () => {
  assert.deepEqual(uniqueStrings(['a', 'b', 'a']), ['a', 'b']);
});
