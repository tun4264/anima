import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
const fileName = 'anima';
const libraryName = fileName.toLocaleUpperCase();
const config = [
  {
    input: `src/${fileName}.js`,
    output: [
      {
        file: `build/${fileName}.module.js`,
        name: `${libraryName}`,
        format: 'es',
      },
      {
        file: `build/${fileName}.js`,
        name: `${libraryName}`,
        format: 'umd',
      },
      {
        file: `build/${fileName}.cjs`,
        name: `${libraryName}`,
        format: 'cjs',
      },
    ],
    plugins: [resolve(), babel({ babelHelpers: 'bundled'})],
  },
  {
    input: `src/${fileName}.js`,
    output: [
      {
        file: `build/${fileName}.min.js`,
        name: `${libraryName}`,
        format: 'umd',
        compact: true,
      },
    ],
    plugins: [resolve(), babel({babelHelpers: 'bundled', compact: true, comments: false})],
  }
];
export default config;