/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  babelrcRoots: ['examples/*'],
  overrides: [
    {
      plugins: [
        'babel-plugin-typescript-strip-namespaces',
        'babel-plugin-replace-ts-export-assignment',
        require.resolve(
          './scripts/babel-plugin-jest-replace-ts-require-assignment.js'
        ),
      ],
      presets: ['@babel/preset-typescript'],
      test: /\.tsx?$/,
    },
    // we want this file to keep `import()`, so exclude the transform for it
    {
      plugins: ['@babel/plugin-syntax-dynamic-import'],
      presets: [
        '@babel/preset-typescript',
        [
          '@babel/preset-env',
          {
            exclude: ['@babel/plugin-proposal-dynamic-import'],
            shippedProposals: true,
            targets: {node: 8},
          },
        ],
      ],
      test: 'packages/jest-config/src/importMjs.ts',
    },
  ],
  plugins: [
    ['@babel/plugin-transform-modules-commonjs', {allowTopLevelThis: true}],
    '@babel/plugin-transform-strict-mode',
    '@babel/plugin-proposal-class-properties',
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        shippedProposals: true,
        targets: {node: 8},
      },
    ],
  ],
};
