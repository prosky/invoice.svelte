import svelte from 'rollup-plugin-svelte';
//import svelte from 'rollup-plugin-svelte-hot';
import resolve from '@rollup/plugin-node-resolve';

import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import {terser} from 'rollup-plugin-terser';
import scss from "rollup-plugin-scss";
import json from "@rollup/plugin-json";
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';
import postcss from 'rollup-plugin-postcss';
/*
import alias from '@rollup/plugin-alias';
import path from 'path';

const ROOT_DIR = __dirname;
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');
*/


const production = !process.env.ROLLUP_WATCH;

function serve() {
    let server;

    function toExit() {
        if (server) server.kill(0);
    }

    return {
        writeBundle() {
            if (server) return;
            server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true
            });

            process.on('SIGTERM', toExit);
            process.on('exit', toExit);
        }
    };
}

export default {
    input: 'src/main.ts',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js'
    },
    plugins: [
        /*alias({
            resolve: ['.svelte', '.ts'],
            entries: [
                {find: '@src', replacement: SRC_DIR},
                {find: '@app', replacement: path.resolve(SRC_DIR, 'app')},
                {find: '@components', replacement: path.resolve(SRC_DIR, 'components')},
            ],
        }),*/
        svelte({
            compilerOptions:{
                dev: !production,
                //sourcemap: true
            },
            // enable run-time checks when not in production
            //dev: !production,
            // we'll extract any component CSS out into
            // a separate file - better for performance
            /*css: css => {
                css.write('bundle.css');
            },*/
            emitCss: true,
            preprocess: sveltePreprocess({
                //sourceMap: true,
                scss: {
                    includePaths: ['src/scss'],
                    options:{
                        implementation: require('node-sass')
                    }
                },
                postcss: {
                    plugins: [require('autoprefixer')],
                },
            }),
        }),
        scss({
            output: 'public/build/global.css',
            sass: require('node-sass')
        }),
        postcss({
            extract: true,
            sourceMap: true,
        }),
        json(),
        url({
            limit: 0,
            publicPath: 'build/'
        }),
        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ['svelte']
        }),
        commonjs(),
        typescript({
            sourceMap: !production,
            inlineSources: !production
        }),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser(),
    ],
    watch: {
        clearScreen: false
    }
};
