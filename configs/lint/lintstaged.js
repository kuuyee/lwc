module.exports = {
  '*.{js,jsx,ts,tsx}': ['pnpm eslint --fix', 'pnpm prettier --write'],
  '*.vue': [
    'pnpm eslint --fix',
    'pnpm stylelint --fix',
    'pnpm prettier --write',
  ],
  '*.{css,scss,less,styl,html}': [
    'pnpm stylelint --fix',
    'pnpm prettier --write',
  ],
}
