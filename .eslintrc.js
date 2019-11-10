module.exports = {
  root: true,
  parser: 'babel-eslint',
  globals: {
    window: true,
    document: true,
    fetch: false,
  },
  parserOptions: {
    allowImportExportEverywhere: true,
    codeFrame: false,
  },
  extends: [
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'airbnb',
    'prettier',
  ],
  plugins: ['filenames', 'promise', 'html'],
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.config.js',
      },
    },
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 'off',
    'import/no-default-export': 'error', // prefer named export
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'always', // use space in function declaration
        asyncArrow: 'always',
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js'], // no .jsx
      },
    ],
    'eslint-comments/disable-enable-pair': [
      'error',
      {
        allowWholeFile: true,
      },
    ],
    'no-restricted-syntax': [
      // allow for..of
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
      "BinaryExpression[operator='in']",
    ],
    // blacklist vars (but not "error")
    'id-blacklist': [
      'error',
      'e',
      'err',
      'msg',
      'arr',
      'obj',
      'temp',
      'that',
      'elem',
    ],
    'no-implicit-coercion': 'error', // do not use ~, !!, + or * type coercion (use Number, Boolean, String)
    'object-curly-newline': [
      'warn',
      {
        // allow 5 or less
        ObjectExpression: {
          minProperties: 5,
          multiline: true,
          consistent: true,
        },
        ObjectPattern: { minProperties: 5, multiline: true, consistent: true },
        ImportDeclaration: {
          minProperties: 5,
          multiline: true,
          consistent: true,
        },
        ExportDeclaration: {
          minProperties: 5,
          multiline: true,
          consistent: true,
        },
      },
    ],
    'quote-props': ['warn', 'as-needed', { numbers: true }], // quotes for object props
    'max-len': [
      'warn',
      {
        code: 80, // Use the same as prettier
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'arrow-body-style': 'warn',
    'react/prop-types': 'warn',
  },
};
