module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'components/**/*.{js,vue}',
    'layouts/**/*.{js,vue}',
    'pages/**/*.{js,vue}',
    'plugins/**/*.{js,vue}',
    'store/**/*.{js,vue}',
  ],
}
