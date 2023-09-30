import { GLOB_EXCLUDE } from '../globs'
import { type FlatESLintConfigItem } from '../types'

export function ignores(): FlatESLintConfigItem[] {
    return [
        {
            ignores: GLOB_EXCLUDE,
        },
    ]
}
