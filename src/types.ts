export type Awaitable<T> = T | Promise<T>

export interface OptionsProjectType {
    /**
     * Type of the project. `lib` will enable more strict rules for libraries.
     *
     * @default 'app'
     */
    type?: 'app' | 'lib'
}

export interface OptionsConfig extends OptionsProjectType {
    /**
     * Enable regexp rules.
     *
     * @see https://ota-meshi.github.io/eslint-plugin-regexp/
     * @default false
     */
    regexp?: boolean
}
