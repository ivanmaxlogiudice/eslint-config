# @ivanmaxlogiudice/eslint-config [![npm (scoped with tag)](https://flat.badgen.net/npm/v/@ivanmaxlogiudice/eslint-config)](https://npmjs.com/package/@ivanmaxlogiudice/eslint-config) [![npm](https://flat.badgen.net/npm/dt/@ivanmaxlogiudice/eslint-config)](https://npmjs.com/package/@ivanmaxlogiudice/eslint-config) #

Personal Flat ESLint configuration for Javascript, TypeScript, Vue 2, Vue 3.

based on [@sxzz/eslint-config](https://github.com/sxzz/eslint-config)

## Features
- Single quotes, no semi
- Auto fix for formatting (aimed to be used standalone without Prettier)
- Designed to work with TypeScript, Vue 2 & 3 out-of-box
- Lint also for json, yaml, markdown
- Sorted imports, dangling commas
- Reasonable defaults, best practices, only one-line of config

## Install
```bash
pnpm add -D @ivanmaxlogiudice/eslint-config
```

## Usage
```js
// eslint.config.js
import { defineFlatConfig } from 'eslint-define-config'
import { all } from '@ivanmaxlogiudice/eslint-config'

export default defineFlatConfig(all)
```

### Custom Config

```js
import { config } from '@ivanmaxlogiudice/eslint-config'
export default config(
  [
    /* your custom config */
  ],
  { vue: true, markdown: true }
)
```

## License

[MIT](./LICENSE) License © 2022-PRESENT [Iván M. Lo Giudice](https://github.com/ivanmaxlogiudice)