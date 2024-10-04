import { dedupe, parsePath, toFlatConfig } from '@ivanmaxlogiudice/gitignore'
import { GLOB_EXCLUDE } from '../globs'
import { findUp } from '../utils'
import type { TypedFlatConfigItem } from '../types'

export function ignores(userIgnores: string[] = []): TypedFlatConfigItem[] {
    const path = findUp('.gitignore')
    const patterns = path ? parsePath(path) : []

    return [
        toFlatConfig(
            dedupe([...GLOB_EXCLUDE, ...patterns, ...userIgnores]),
            {
                name: 'ivanmaxlogiudice/ignores',
            },
        ),
    ]
}
