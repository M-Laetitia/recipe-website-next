const nextJest = require('next/jest');
const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // adapte à ton projet

    // Mock tout `swiper` et ses sous-modules
    '^swiper/react$': '<rootDir>/__mocks__/swiper/react.js',
    '^swiper(.*)$': '<rootDir>/__mocks__/swiper.js',
    // '^swiper$': '<rootDir>/__mocks__/swiper.js',

    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

module.exports = createJestConfig(customJestConfig);