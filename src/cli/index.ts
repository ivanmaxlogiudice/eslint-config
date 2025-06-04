import process from 'node:process'
import * as p from '@clack/prompts'
import { cac } from 'cac'
import c from 'picocolors'

import { pkgJson } from './constants'
import { run } from './run'

function header(): void {
    console.log('\n')
    p.intro(`${c.green(`@ivanmaxlogiudice/eslint-config `)}${c.dim(`v${pkgJson.version}`)}`)
}

const cli = cac('@ivanmaxlogiudice/eslint-config')

cli
    .command('', 'Run the initialization or migration')
    .option('--yes, -y', 'Skip prompts and use default values', { default: false })
    .option('--template, -t <template>', 'Use the framework template for optimal customization: vue', { type: [] })
    .option('--extra, -e <extra>', 'Use the extra utils: unocss', { type: [] })
    .action(async (args) => {
        header()
        try {
            await run(args)
        }
        catch (error) {
            p.log.error(c.inverse(c.red(' Failed to migrate ')))
            p.log.error(c.red(`✘ ${String(error)}`))
            process.exit(1)
        }
    })

cli.help()
cli.version(pkgJson.version)
cli.parse()
