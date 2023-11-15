module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --ignore-path .gitignore --cache --fix',
    'prettier --ignore-path .gitignore --write',
  ],
  '*.{ts,tsx}': () => 'npm run check:types',
}
