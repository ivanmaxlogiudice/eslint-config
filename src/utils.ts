import type { Awaitable } from './types'
import path from 'path'
import fsp from 'fs/promises'

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

export async function packageExists(name: string) {
    const pkgPath = path.join(process.cwd(), 'package.json')
    
    const pkgContent = await fsp.readFile(pkgPath, 'utf-8')
    const pkg: Record<string, any> = JSON.parse(pkgContent)
    
    return pkg?.dependencies?.[name] !== undefined || pkg?.devDependencies?.[name] !== undefined
}

export async function ensurePackages(packages: string[]): Promise<void> {
    if (process.env.CI || process.stdout.isTTY === false)
        return

    const missingPackages = packages.filter(async name => name && await packageExists(name))
    if (missingPackages.length === 0)
        return

    // TODO: In vscode windows, "@clack/prompts" doesnt works, check for another one.
    throw new Error(`${missingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config: ${missingPackages.join(', ')}. Do you want to install them?`)
}

export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
    const resolved = await m
    return (resolved as any).default || resolved
}
