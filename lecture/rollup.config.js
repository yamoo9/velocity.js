import css      from 'rollup-plugin-css-porter';
import babel    from 'rollup-plugin-babel';
import eslint   from 'rollup-plugin-eslint';
import uglify   from 'rollup-plugin-uglify';
import resolve  from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const css_options = {
  minified: false,
  dest: './dist/bundle.css',
};

const config = {
  input: './src/main.js',
  output: {
    file: './dist/bundle.js',
    format: 'iife',
    sourcemap: true,
    globals: {
      jquery: '$',
      detectizr: 'Detectizr',
      'velocity-animate': 'Velocity',
    },
  },
  external: ['jquery', 'velocity-animate', 'detectizr'],
  plugins: [
    css(css_options),
    eslint({
      include: './src/**',
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};


if ( process.env.NODE_ENV === 'production' ) {
  css_options.minified = true;
  config.output.file = './dist/bundle.min.js';
  config.output.sourcemap = false;
  delete config.output.globals;
  delete config.external;
  config.plugins.push(
    resolve({
      main: true,
      module: true,
      jsnext: true,
      browser: true,
    }),
    commonjs(),
    uglify(),
  );
}

export default config;