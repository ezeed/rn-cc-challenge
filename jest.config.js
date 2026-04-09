module.exports = {
  preset: 'jest-expo',
  testMatch: ['<rootDir>/lib/**/*.test.ts', '<rootDir>/features/**/*.test.ts?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
