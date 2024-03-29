# @ivanmaxlogiudice/eslint-config [![npm (scoped with tag)](https://flat.badgen.net/npm/v/@ivanmaxlogiudice/eslint-config)](https://npmjs.com/package/@ivanmaxlogiudice/eslint-config) [![npm](https://flat.badgen.net/npm/dt/@ivanmaxlogiudice/eslint-config)](https://npmjs.com/package/@ivanmaxlogiudice/eslint-config)

Personal Flat ESLint configuration for Javascript, TypeScript, Vue 3.

based on [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## Features

-   Single quotes, no semi
-   Auto fix for formatting (aimed to be used standalone **without** Prettier)
-   Designed to work with TypeScript, JSX, Vue out-of-box
-   Lint also for json, yaml, markdown
-   Sorted imports, dangling commas
-   Reasonable defaults, best practices, only one-line of config
-   Respects `.gitignore` by default
-   Optional [formatters](#formatters) support for CSS, HTML, TOML, etc.
-   [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
-   Using [ESLint Stylistic](https://github.com/eslint-stylistic/eslint-stylistic)
-   Using [ESLint Perfectionist](https://github.com/azat-io/eslint-plugin-perfectionist) for sorting
-   **Style principle**: Minimal for reading, stable for diff, consistent

## Usage

### Starter Wizard

We provided a CLI tool to help you set up your project, or migrate from the legacy config to the new flat config with one command.

```bash
pnpx @ivanmaxlogiudice/eslint-config@latest
```

### Manual Install

If you prefer to set up manually:

```bash
pnpm add -D @ivanmaxlogiudice/eslint-config
```

And create `eslint.config.mjs` in your project root:

```js
// eslint.config.mjs
import config from '@ivanmaxlogiudice/eslint-config'

export default config()
```

<details>
<summary>
Combined with legacy config:
</summary>

If you still use some configs from the legacy eslintrc format, you can use the [`@eslint/eslintrc`](https://www.npmjs.com/package/@eslint/eslintrc) package to convert them to the flat config.

```js
// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc'
import config from '@ivanmaxlogiudice/eslint-config'

const compat = new FlatCompat()

export default config(
    {
        ignores: [],
    },

    // Legacy config
    ...compat.config({
        extends: [
            'eslint:recommended',
            // Other extends...
        ],
    })

    // Other flat configs...
)
```

> Note that `.eslintignore` no longer works in Flat config, see [customization](#customization) for more details.

</details>

### Add script for package.json

For example:

```json
{
    "scripts": {
        "lint": "eslint .",
        "lint:fix": "eslint . --fix"
    }
}
```

### Migration

We provided an experimental CLI tool to help you migrate from the legacy config to the new flat config.

```bash
# pnpm
pnpx @ivanmaxlogiudice/eslint-config@latest

Options:
  -y, --yes         Skip prompts and use default values
  -i, --ignore-git  Skip uncommitted changes
```

Before running the migration, make sure to commit your unsaved changes first.

## VS Code support (auto fix on save)

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `settings.json`:

```jsonc
{
    // Enable the flat config support
    "eslint.experimental.useFlatConfig": true,

    // Disable the default formatter
    "prettier.enable": false,
    "editor.formatOnSave": false,

    // Auto fix
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit",
        "source.organizeImports": "never"
    },

    // Silent the stylistic rules in you IDE, but still auto fix them
    "eslint.rules.customizations": [
        { "rule": "style/*", "severity": "off" },
        { "rule": "format/*", "severity": "off" },
        { "rule": "*-indent", "severity": "off" },
        { "rule": "*-spacing", "severity": "off" },
        { "rule": "*-spaces", "severity": "off" },
        { "rule": "*-order", "severity": "off" },
        { "rule": "*-dangle", "severity": "off" },
        { "rule": "*-newline", "severity": "off" },
        { "rule": "*quotes", "severity": "off" },
        { "rule": "*semi", "severity": "off" }
    ],

    // The following is optional.
    // It's better to put under project setting `.vscode/settings.json`
    // to avoid conflicts with working with different eslint configs
    // that does not support all formats.
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact",
        "vue",
        "html",
        "markdown",
        "json",
        "jsonc",
        "toml",
        "gql",
        "graphql"
    ]
}
```

## Customization

Normally you only need to import the `config` preset:

```js
// eslint.config.js
import config from '@ivanmaxlogiudice/eslint-config'

export default config()
```

And that's it! Or you can configure each integration individually, for example:

```js
// eslint.config.js
import config from '@ivanmaxlogiudice/eslint-config'

export default config({
    // Enable stylistic formatting rules
    // stylistic: true,

    // Or customize the stylistic rules
    stylistic: {
        indent: 2, // 4, or 'tab'
        quotes: 'single', // or 'double'
    },

    // TypeScript and Vue are auto-detected, you can also explicitly enable them:
    typescript: true,
    vue: true,

    // Disable jsonc and yaml support
    jsonc: false,
    yaml: false,

    // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
    ignores: [
        '**/fixtures',
        // ...globs
    ]
})
```

The `config` factory function also accepts any number of arbitrary custom config overrides:

```js
// eslint.config.js
import config from '@ivanmaxlogiudice/eslint-config'

export default config(
    {
        // Configuration
    },

    // From the second arguments they are ESLint Flat Configs
    // you can have multiple configs
    {
        files: ['**/*.ts'],
        rules: {},
    },
    {
        rules: {},
    },
)
```

Going more advanced, you can also import fine-grained configs and compose them as you wish:

<details>
<summary>Advanced Example</summary>

We wouldn't recommend using this style in general unless you know exactly what they are doing, as there are shared options between configs and might need extra care to make them consistent.

```js
// eslint.config.js
import {
    comments,
    ignores,
    imports,
    javascript,
    jsdoc,
    jsonc,
    markdown,
    node,
    perfectionist,
    sortPackageJson,
    sortTsconfig,
    stylistic,
    test,
    typescript,
    unicorn,
    unocss,
    vue,
    yaml,
} from '@ivanmaxlogiudice/eslint-config'

export default [
    ...comments(),
    ...ignores(),
    ...imports(),
    ...javascript(/* options */),
    ...jsdoc(),
    ...jsonc(),
    ...markdown(),
    ...node(),
    ...perfectionist(),
    ...sortPackageJson(),
    ...sortTsconfig(),
    ...stylistic(),
    ...test(),
    ...typescript(/* options */),
    ...unicorn(),
    ...unocss(),
    ...vue(),
    ...yaml(),
]
```

</details>

Check out the [configs](https://github.com/ivanmaxlogiudice/eslint-config/blob/main/src/configs) and [factory](https://github.com/ivanmaxlogiudice/eslint-config/blob/main/src/factory.ts) for more details.

### Plugins Renaming

Since flat config requires us to explicitly provide the plugin names (instead of mandatory convention from npm package name), we renamed some plugins to make overall scope more consistent and easier to write.

| New Prefix | Original Prefix        | Source Plugin                                                                              |
| ---------- | ---------------------- | ------------------------------------------------------------------------------------------ |
| `import/*` | `import-x/*`           | [eslint-plugin-import-x](https://github.com/un-es/eslint-plugin-import-x)                  |
| `node/*`   | `n/*`                  | [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n)                     |
| `yaml/*`   | `yml/*`                | [eslint-plugin-yml](https://github.com/ota-meshi/eslint-plugin-yml)                        |
| `ts/*`     | `@typescript-eslint/*` | [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint) |
| `style/*`  | `@stylistic/*`         | [@stylistic/eslint-plugin](https://github.com/eslint-stylistic/eslint-stylistic)           |
| `test/*`   | `vitest/*`             | [eslint-plugin-vitest](https://github.com/veritem/eslint-plugin-vitest)                    |
| `test/*`   | `no-only-tests/*`      | [eslint-plugin-no-only-tests](https://github.com/levibuzolic/eslint-plugin-no-only-tests)  |

When you want to override rules, or disable them inline, you need to update to the new prefix:

```diff
-// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
+// eslint-disable-next-line ts/consistent-type-definitions
type foo = { bar: 2 }
```

### Rules Overrides

Certain rules would only be enabled in specific files, for example, `ts/*` rules would only be enabled in `.ts` files and `vue/*` rules would only be enabled in `.vue` files. If you want to override the rules, you need to specify the file extension:

```js
// eslint.config.js
import config from '@ivanmaxlogiudice/eslint-config'

export default config(
    {
        vue: true,
        typescript: true
    },
    {
        // Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
        files: ['**/*.vue'],
        rules: {
            'vue/operator-linebreak': ['error', 'before'],
        },
    },
    {
        // Without `files`, they are general rules for all files
        rules: {
            'style/semi': ['error', 'never'],
        },
    }
)
```

We also provided a `overrides` options in each integration to make it easier:

```js
// eslint.config.js
import config from '@ivanmaxlogiudice/eslint-config'

export default config({
    vue: {
        overrides: {
            'vue/operator-linebreak': ['error', 'before'],
        },
    },
    typescript: {
        overrides: {
            'ts/consistent-type-definitions': ['error', 'interface'],
        },
    },
    yaml: {
        overrides: {
            // ...
        },
    },
})
```

### Optional Configs

We provide some optional configs for specific use cases, that we don't include their dependencies by default.

#### Formatters

> [!WARNING]
> Experimental feature, changes might not follow semver.
> Use external formatters to format files that ESLint cannot handle yet (`.css`, `.html`, etc). Powered by [`eslint-plugin-format`](https://github.com/antfu/eslint-plugin-format).

```js
// eslint.config.js
import config from '@ivanmaxlogiudice/eslint-config'

export default config({
    // Enable all formatters
    // formatters: true,

    // Or customize the formatters
    formatters: {
        /**
         * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
         * By default uses Prettier
         */
        css: true,

        /**
         * Format HTML files
         * By default uses Prettier
         */
        html: true,

        /**
         * Format TOML files
         * Currently only supports dprint
         */
        toml: 'dprint',

        /**
         * Format Markdown files
         * Supports Prettier and dprint
         * By default uses Prettier
         */
        markdown: 'prettier'
    }
})
```

Running `pnpx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
pnpm add -D eslint-plugin-format
```

#### UnoCSS

UnoCSS is auto-detected, you can also explicitly enable them:

```js
// eslint.config.js
import config from '@ivanmaxlogiudice/eslint-config'

export default config({
    unocss: true,
})
```

Running `pnpx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
pnpm add -D @unocss/eslint-plugin
```

### Optional Rules

This config also provides some optional plugins/rules for extended usage.

#### `perfectionist` (sorting)

This plugin [`eslint-plugin-perfectionist`](https://github.com/azat-io/eslint-plugin-perfectionist) allows you to sort object keys, imports, etc, with auto-fix.

The plugin is installed, you can check the [enabled rules](/src/configs/perfectionist.ts) for more info.

It's recommended to opt-in on each file individually using [configuration comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1).

```js
/* eslint perfectionist/sort-objects: "error" */
const objectWantedToSort = {
    a: 2,
    b: 1,
    c: 3,
}
/* eslint perfectionist/sort-objects: "off" */
```

### Type Aware Rules

You can optionally enable the [type aware rules](https://typescript-eslint.io/linting/typed-linting/) by passing the options object to the `typescript` config:

```js
// eslint.config.js
import config from '@ivanmaxlogiudice/eslint-config'

export default config({
    typescript: {
        tsconfigPath: 'tsconfig.json',

        // or if you have multiple tsconfigs
        tsconfigPath: ['tsconfig.json', 'tsconfig.node.json', 'packages/*/tsconfig.json']
    },
})
```

### Editor Specific Disables

Some rules are disabled when inside ESLint IDE integrations, namely [`unused-imports/no-unused-imports`](https://www.npmjs.com/package/eslint-plugin-unused-imports) [`test/no-only-tests`](https://github.com/levibuzolic/eslint-plugin-no-only-tests)

This is to prevent unused imports from getting removed by the IDE during refactoring to get a better developer experience. Those rules will be applied when you run ESLint in the terminal or [Lint Staged](#lint-staged). If you don't want this behavior, you can disable them:

```js
// eslint.config.js
import config from '@ivanmaxlogiudice/eslint-config'

export default config({
    isInEditor: false
})
```

### Lint Staged

If you want to apply lint and auto-fix before every commit, you can add the following to your `package.json`:

```json
{
    "simple-git-hooks": {
        "pre-commit": "pnpm lint-staged"
    },
    "lint-staged": {
        "*": "eslint --fix"
    }
}
```

and then

```bash
pnpm add -D lint-staged simple-git-hooks
```

## FAQ

### Prettier?

Why I don't use Prettier ? [Check @antfu post](https://antfu.me/posts/why-not-prettier)

Well, you can still use Prettier to format files that are not supported well by ESLint yet, such as `.css`, `.html`, etc. See [formatters](#formatters) for more details.

### dprint?

[dprint](https://dprint.dev/) is also a great formatter that with more abilities to customize. However, it's in the same model as Prettier which reads the AST and reprints the code from scratch. This means it's similar to Prettier, which ignores the original line breaks and might also cause the inconsistent diff. So in general, we prefer to use ESLint to format and lint JavaScript/TypeScript code.

Meanwhile, we do have dprint integrations for formatting other files such as `.toml` and `.md`. See [formatters](#formatters) for more details.

### How to format CSS?

You can opt-in to the [`formatters`](#formatters) feature to format your CSS. Note that it's only doing formatting, but not linting. If you want proper linting support, give [`stylelint`](https://stylelint.io/) a try.

## License

[MIT](./LICENSE) License © 2022-PRESENT [Iván M. Lo Giudice](https://github.com/ivanmaxlogiudice)
