import config from './src'

export default config({
    vue: true,
    react: true,
    solid: true,
    svelte: true,
    astro: true,
    typescript: true,
    formatters: true,
    type: 'lib',
}, {
    ignores: [
        'fixtures',
        '_fixtures',
    ],
}, {
    files: ['src/**/*.ts'],
    rules: {
        'perfectionist/sort-objects': 'error',
    },
})
