import { execSync } from 'node:child_process'
import process from 'node:process'
import c from 'picocolors'

export function throwError(level: string, message: string) {
    console.error(`\n${c.inverse(c.red(` Failed to migrate `))}`)
    console.error(level, message)
    process.exit(1)
}

export function isGitClean() {
    try {
        execSync('git diff-index --quiet HEAD --')
        return true
    }
    catch {
        return false
    }
}
