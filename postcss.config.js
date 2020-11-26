module.exports = (api) => {
    return {
        // You can specify any options from http://api.postcss.org/global.html#processOptions here
        plugins: [
            "postcss-preset-env",
        ],
    };
};