module.exports = {
    presets: [
       // "@babel/preset-typescript",
        ['@babel/preset-env', {
            modules: false,
            useBuiltIns: "usage",
            corejs: 3,
        }]
    ],
    plugins: [
        ['@babel/plugin-transform-runtime', {
            corejs: 3,
            useESModules: true,
            regenerator: true,
        }],
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-optional-chaining',
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-private-methods",
        "@babel/plugin-syntax-dynamic-import",
        '@babel/plugin-syntax-class-properties',
    ]
};