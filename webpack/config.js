const path = require('path')

module.exports = {
    entry: './main.js',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.(html|svelte)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        emitCss: true,
                        preprocess: require('svelte-preprocess')({})
                    },
                },
            },
        ],
    },
}