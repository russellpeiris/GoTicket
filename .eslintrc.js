module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
  },
  settings: {
    react: {
      version: 'latest', // Specify the React version you are using here
    },
  },
};
