import type { RuleOptions } from './typegen'
import type { ParserOptions } from '@typescript-eslint/parser'
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

export interface OptionsFiles {
    /**
     * Override the `files` option to provide custom globs.
     */
    files?: string[]
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

export interface OptionsTypeScriptParserOptions {
    /**
     * Additional parser options for TypeScript.
     */
    parserOptions?: Partial<ParserOptions>

    /**
     * Glob patterns for files that should be type aware.
     * @default ['**\/*.{ts,tsx}']
     */
    filesTypeAware?: string[]

    /**
     * Glob patterns for files that should not be type aware.
     * @default ['**\/*.md\/**', '**\/*.astro/*.ts']
     */
    ignoresTypeAware?: string[]
}

export interface OptionsTypeScriptWithTypes {
    /**
     * When this options is provided, type aware rules will be enabled.
     * @see https://typescript-eslint.io/linting/typed-linting/
     */
    tsconfigPath?: string

    /**
     * Override type aware rules.
     */
    overridesTypeAware?: TypedFlatConfigItem['rules']
}

export interface OptionsOverrides {
    overrides?: TypedFlatConfigItem['rules']
}

export interface OptionsProjectType {
    /**
     * Type of the project. `lib` will enable more strict rules for libraries.
     *
     * @default 'app'
     */
    type?: 'app' | 'lib'
}

export interface OptionsIsInEditor {
    isInEditor?: boolean
}

export interface OptionsUnoCSS extends OptionsOverrides {
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
     * Core rules. Can't be disabled.
     */
    javascript?: OptionsOverrides

    /**
     * Enable TypeScript support.
     *
     * Passing an object to enable TypeScript Language Server support.
     *
     * @default auto-detect based on the dependencies
     */
    typescript?: boolean | OptionsOverrides

    /**
     * Enable test support.
     *
     * @default true
     */
    test?: boolean | OptionsOverrides

    /**
     * Enable Vue support.
     *
     * @default auto-detect based on the dependencies
     */
    vue?: boolean | OptionsOverrides

    /**
     * Enable JSONC support.
     *
     * @default true
     */
    jsonc?: boolean | OptionsOverrides

    /**
     * Enable YAML support.
     *
     * @default false
     */
    yaml?: boolean | OptionsOverrides

    /**
     * Enable linting for **code snippets** in Markdown.
     *
     * For formatting Markdown content.
     *
     * @default false
     */
    markdown?: boolean | OptionsOverrides

    /**
     * Enable stylistic rules.
     *
     * @see https://eslint.style/
     */
    stylistic?: OptionsOverrides

    /**
     * Enable regexp rules.
     *
     * @see https://ota-meshi.github.io/eslint-plugin-regexp/
     * @default false
     */
    regexp?: boolean | OptionsOverrides

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
     * Control to disable some rules in editors.
     *
     * @default auto-detect based on the process.env
     */
    isInEditor?: boolean
}
