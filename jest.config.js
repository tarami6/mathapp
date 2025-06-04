module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testMatch: [
    '<rootDir>/src/**/*.steps.js',
    '<rootDir>/src/**/*.test.js'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.js',
    '^uuid$': require.resolve('uuid')
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './.babelrc' }]
  },
  transformIgnorePatterns: [
    'node_modules/(?!(uuid)/)'
  ],
  testEnvironmentOptions: {
    url: 'http://localhost'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.js',
    '!src/serviceWorker.js'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/'
  ],
  verbose: true
}; 