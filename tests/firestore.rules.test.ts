import { assertFails, assertSucceeds, initializeTestEnvironment, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, it, beforeAll, afterAll, beforeEach } from 'vitest';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'shevaly-test',
    firestore: {
      rules: readFileSync(resolve(__dirname, '../DRAFT_firestore.rules'), 'utf8'),
      host: '127.0.0.1',
      port: 8080
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

describe('Firestore Security Rules', () => {
  it('Should allow verified users to create an active product with a valid schema', async () => {
    // Tests are coming soon... just setting up.
  });
});
