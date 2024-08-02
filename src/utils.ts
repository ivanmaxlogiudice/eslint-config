import type { Awaitable } from './types'
import path from 'path'
import fs from 'fs'

export function renameRules(rules: Record<string, any>, from: string, to: string): Record<string, any> {
    const renamed: Record<string, any> = {}
    for (const rule in rules) {
        if (rule.startsWith(from)) {
            renamed[`${to}${rule.slice(from.length)}`] = rules[rule]
            continue
        }

        renamed[rule] = rules[rule]
    }

    return renamed
}

export function searchPackageJSON() {
    let currentDir = __dirname
    while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
        currentDir = path.join(currentDir, '..')
    }

    return currentDir
}

export async function packageExists(name: string) {
    const pkg = path.join(__dirname, 'package.json')
    
    return pkg
}

export async function ensurePackages(packages: string[]): Promise<void> {
    if (process.env.CI || process.stdout.isTTY === false)
        return

    // const missingPackages = packages.filter(package => package && )
}

export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
    const resolved = await m
    return (resolved as any).default || resolved
}
