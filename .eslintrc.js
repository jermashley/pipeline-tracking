module.exports = {
  plugins: [`simple-import-sort`],
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: `module`,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: `detect`,
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    `eslint:recommended`,
    `plugin:react/recommended`,
    `plugin:jsx-a11y/recommended`,
    `plugin:prettier/recommended`,
  ],
  rules: {
    'prettier/prettier': [`error`, {}, { usePrettierrc: true }],
    'quotes': [`error`, `backtick`],
    'react/prop-types': 0,
    'react/no-children-prop': 0,
    'react/react-in-jsx-scope': `off`,
    'jsx-a11y/anchor-is-valid': [
      `error`,
      {
        components: [`Link`],
        specialLink: [`hrefLeft`, `hrefRight`],
        aspects: [`invalidHref`, `preferButton`],
      },
    ],
  },
}
