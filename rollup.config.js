import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'default',
  },
  plugins: [
    resolve(),
    commonjs(),
    terser({ format: { comments: false } }),
    visualizer(),
  ],
};
