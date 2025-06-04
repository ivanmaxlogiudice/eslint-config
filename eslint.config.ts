import { config } from './src'

export default config({
    type: 'lib',
    yaml: true,
    markdown: true,
}, {
    ignores: ['fixtures', '_fixtures'],
}, {
    files: ['src/**/*.ts'],
    rules: {
        'perfectionist/sort-objects': ['error', {
            partitionByComment: true,
            groups: ['top', 'unknown'],
            customGroups: {
                top: ['^name'],
            },
        }],
    },
})
