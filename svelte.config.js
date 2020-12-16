const preprocess = require('svelte-preprocess');

module.exports = {
	preprocess: preprocess({
		defaults: {
			script: 'typescript',
		},
		postcss: true,
		scss: {
			includePaths: ['src/scss'],
			options: {
				implementation: require('node-sass')
			}
		},
	}),
};
