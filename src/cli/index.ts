import { cac } from 'cac'
import c from 'picocolors'
import { version } from './constants'
import { run } from './run'

const cli = cac(
    c.green('@ivanmaxlogiudice/eslint-config'),
)

cli
    .command('', 'Run the initialization or migration')
    .option('-y, --yes', 'Skip prompts and use default values', { type: [Boolean] })
    .action(run)

cli.help()
cli.version(`${c.bold(version)}`)
cli.parse()

// Show the Help section if no command is given
if (!cli.matchedCommand)
    cli.outputHelp()
