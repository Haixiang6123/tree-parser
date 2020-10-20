module.exports = {
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover"
  ],
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "\\.pnp\\.[^\\/]+$"
  ],
};
