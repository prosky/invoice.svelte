const resolve = require( "@rollup/plugin-node-resolve").default;

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	mount: {
		public: {url: '/', static: true},
		src: {url: '/dist'},
	},
	extends: '@sveltejs/snowpack-config',
	plugins: [
		'@snowpack/plugin-typescript',
		'@snowpack/plugin-dotenv',
		'@snowpack/plugin-svelte',
	],
	alias: {
		//$app: './src/app',
		$components: './src/components'
	},

	install: [
		/* ... */
	],
	installOptions: {
		installTypes: true,
		rollup:{
			plugins:[
				resolve({
					browser: true,
					dedupe: ['svelte'],
					extensions: [ '.mjs', '.js', '.jsx', '.json' , '.ts'],
				}),
			]
		}
		/* ... */
	},
	devOptions: {
		/* ... */
	},
	buildOptions: {
		/* ... */
	},
	proxy: {
		/* ... */
	},
};
