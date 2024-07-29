import antfu from '@antfu/eslint-config'

export const config: typeof antfu = (options, ...userConfigs) => {
    return antfu({
        stylistic: {
            indent: 4,
        },
        ...options,
    }, ...userConfigs)
}

export default config
