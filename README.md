# @ivanmaxlogiudice/eslint-config [![npm (scoped with tag)](https://flat.badgen.net/npm/v/@ivanmaxlogiudice/eslint-config)](https://npmjs.com/package/@ivanmaxlogiudice/eslint-config) [![npm](https://flat.badgen.net/npm/dt/@ivanmaxlogiudice/eslint-config)](https://npmjs.com/package/@ivanmaxlogiudice/eslint-config) #

Personal Flat ESLint configuration for Javascript, TypeScript, Vue 3.

based on [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## Features
- Single quotes, no semi
- Auto fix for formatting (aimed to be used standalone **without** Prettier)
- Designed to work with TypeScript, Vue out-of-box
- Lint also for json, yaml, markdown
- Sorted imports, dangling commas
- Reasonable defaults, best practices, only one-line of config
- Respects `.gitignore` by default
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- Using [ESLint Stylistic](https://github.com/eslint-stylistic/eslint-stylistic)
- **Style principle**: Minimal for reading, stable for diff, consistent

## Usage

### Install
```bash
pnpm i -D @ivanmaxlogiudice/eslint-config
```

### Create config file

With [`"type": "module"`](https://nodejs.org/api/packages.html#type) in `package.json` (recommended):

```js
// eslint.config.js
import config from "@ivanmaxlogiudice/eslint-config"

export default config()
```

With CJS:

```js
// eslint.config.js
const config = require("@ivanmaxlogiudice/eslint-config").default

module.exports = config()
```

> Note that `.eslintignore` no longer works in Flat config, see [customization](#customization) for more details.

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

## VS Code support (auto fix)

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
        "source.fixAll": "explicit",
        "source.organizeImports": "never"
    },

    // Silent the stylistic rules in you IDE, but still auto fix them
    "eslint.rules.customizations": [
        { "rule": "style/*", "severity": "off" },
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
        "yaml"
    ]
}
```

## Customization

Normally you only need to import the `config` preset:

```js
// eslint.config.js
import config from "@ivanmaxlogiudice/eslint-config"

export default config()
```

And that's it! Or you can configure each integration individually, for example:

```js
// eslint.config.js
import config from "@ivanmaxlogiudice/eslint-config"

export default config({
	// Enable stylistic formatting rules
	// stylistic: true,

	// Or customize the stylistic rules
	stylistic: {
		indent: 2, // 4, or 'tab'
		quotes: "single", // or 'double'
	},

	// TypeScript and Vue are auto-detected, you can also explicitly enable them:
	typescript: true,
	vue: true,

	// Disable jsonc and yaml support
	jsonc: false,
	yaml: false,

	// `.eslintignore` is no longer supported in Flat config, use `ignores` instead
	ignores: [
		"./fixtures",
		// ...globs
	]
})
```

The `config` factory function also accepts any number of arbitrary custom config overrides:

```js
// eslint.config.js
import config from "@ivanmaxlogiudice/eslint-config"

export default config(
	{
		// Configuration
	},

	// From the second arguments they are ESLint Flat Configs
	// you can have multiple configs
	{
		files: ["**/*.ts"],
		rules: {},
	},
	{
		rules: {},
	},
)
```

Going more advanced, you can also import fine-grained configs and compose them as you wish:

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
	sortPackageJson,
	sortTsconfig,
	stylistic,
	test,
	typescript,
	unicorn,
	unocss,
	vue,
	yaml,
} from "@ivanmaxlogiudice/eslint-config"

export default [
	...comments(),
	...ignores(),
	...imports(),
	...javascript(),
	...jsdoc(),
	...jsonc(),
	...markdown(),
	...node(),
	...sortPackageJson(),
	...sortTsconfig(),
	...stylistic(),
	...test(),
	...typescript(),
	...unicorn(),
	...unocss(),
	...vue(),
	...yaml(),
]
```

Check out the [configs](https://github.com/ivanmaxlogiudice/eslint-config/blob/main/src/configs) and [factory](https://github.com/ivanmaxlogiudice/eslint-config/blob/main/src/factory.ts) for more details.

## Plugins Renaming

Since flat config requires us to explicitly provide the plugin names (instead of mandatory convention from npm package name), we renamed some plugins to make overall scope more consistent and easier to write.

| New Prefix | Original Prefix | Source Plugin |
| --- | --- | --- |
| `import/*` | `i/*` | [eslint-plugin-i](https://github.com/un-es/eslint-plugin-i) |
| `node/*` | `n/*` | [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n) |
| `yaml/*` | `yml/*` | [eslint-plugin-yml](https://github.com/ota-meshi/eslint-plugin-yml) |
| `ts/*` | `@typescript-eslint/*` | [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint) |
| `style/*` | `@stylistic/*` | [@stylistic/eslint-plugin](https://github.com/eslint-stylistic/eslint-stylistic) |
| `test/*` | `vitest/*` | [eslint-plugin-vitest](https://github.com/veritem/eslint-plugin-vitest) |
| `test/*` | `no-only-tests/*` | [eslint-plugin-no-only-tests](https://github.com/levibuzolic/eslint-plugin-no-only-tests) |

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
import config from "@ivanmaxlogiudice/eslint-config"

export default config(
	{
		vue: true,
		typescript: true
	},
	{
		// Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
		files: ["**/*.vue"],
		rules: {
			"vue/operator-linebreak": ["error", "before"],
		},
	},
	{
		// Without `files`, they are general rules for all files
		rules: {
			"style/semi": ["error", "never"],
		},
	}
)
```

We also provided an `overrides` options to make it easier:

```js
// eslint.config.js
import config from "@ivanmaxlogiudice/eslint-config"

export default config({
	overrides: {
		vue: {
			"vue/operator-linebreak": ["error", "before"],
		},
		typescript: {
			"ts/consistent-type-definitions": ["error", "interface"],
		},
		yaml: {},
		// ...
	}
})
```

### Type Aware Rules

You can optionally enable the [type aware rules](https://typescript-eslint.io/linting/typed-linting/) by passing the options object to the `typescript` config:

```js
// eslint.config.js
import config from "@ivanmaxlogiudice/eslint-config"

export default config({
	typescript: {
		tsconfigPath: "tsconfig.json",
	},
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
pnpm i -D lint-staged simple-git-hooks
```

## License

[MIT](./LICENSE) License © 2022-PRESENT [Iván M. Lo Giudice](https://github.com/ivanmaxlogiudice)
