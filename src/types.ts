import type { RuleOptions } from './typegen'
import type { Linter } from 'eslint'

export type Awaitable<T> = T | Promise<T>

export type Rules = RuleOptions

export type TypedFlatConfigItem = Omit<Linter.Config<Linter.RulesRecord & Rules>, 'plugins'> & {
    // Relax plugins type limitation, as most of the plugins did not have correct type info yet.
    /**
     * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
     *
     * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
     */
    plugins?: Record<string, any>
}

export interface OptionsComponentExts {
    /**
     * Additional extensions for components.
     *
     * @example ['vue']
     * @default []
     */
    componentExts?: string[]
}

export interface OptionsProjectType {
    /**
     * Type of the project. `lib` will enable more strict rules for libraries.
     *
     * @default 'app'
     */
    type?: 'app' | 'lib'
}

export interface OptionsUnoCSS {
    /**
     * Enable attributify support.
     * @default false
     */
    attributify?: boolean

    /**
     * Enable strict mode by throwing errors about blocklisted classes.
     * @default false
     */
    strict?: boolean
}

export interface OptionsHasTypeScript {
    typescript?: boolean
}

export interface OptionsConfig extends OptionsComponentExts, OptionsProjectType {
    /**
     * Enable TypeScript support.
     *
     * Passing an object to enable TypeScript Language Server support.
     *
     * @default auto-detect based on the dependencies
     */
    typescript?: boolean

    /**
     * Enable regexp rules.
     *
     * @see https://ota-meshi.github.io/eslint-plugin-regexp/
     * @default false
     */
    regexp?: boolean

    /**
     * Enable Vue support.
     *
     * @default auto-detect based on the dependencies
     */
    vue?: boolean

    /**
     * Enable unocss rules.
     *
     * Requires installing:
     * - `@unocss/eslint-plugin`
     *
     * @default false
     */
    unocss?: boolean | OptionsUnoCSS

    /**
     * Enable YAML support.
     *
     * @default false
     */
    yaml?: boolean

    /**
     * Enable Markdown support.
     *
     * @default false
     */
    markdown?: boolean
}
