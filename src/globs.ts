export const GLOB_SRC_EXT = '?([cm])[jt]s?(x)'
export const GLOB_SRC = '**/*.?([cm])[jt]s?(x)'

export const GLOB_TS = '**/*.?([cm])ts'

export const GLOB_JSON = '**/*.json'
export const GLOB_JSON5 = '**/*.json5'
export const GLOB_JSONC = '**/*.jsonc'

export const GLOB_NODE_MODULES = '**/node_modules' as const
export const GLOB_DIST = '**/dist' as const
export const GLOB_LOCKFILE = [
    '**/package-lock.json',
    '**/yarn.lock',
    '**/pnpm-lock.yaml',
    '**/bun.lockb',
]
export const GLOB_EXCLUDE = [
    GLOB_NODE_MODULES,
    GLOB_DIST,
    ...GLOB_LOCKFILE,

    '**/output',
    '**/coverage',
    '**/temp',
    '**/fixtures',
    '**/.vitepress/cache',
    '**/.nuxt',
    '**/.vercel',
    '**/.changeset',
    '**/.idea',
    '**/.output',
    '**/.vite-inspect',
    '**/.nitro',

    '**/CHANGELOG*.md',
    '**/*.min.*',
    '**/LICENSE*',
    '**/__snapshots__',
    '**/auto-import?(s).d.ts',
    '**/components.d.ts',
]
