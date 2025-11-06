import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': ['@swc/jest'],
  },
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/packages/core/src/$1',
  },
};

export default config;
