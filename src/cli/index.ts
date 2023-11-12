import { cac } from 'cac'
import c from 'picocolors'
import { version } from './constants'
import { migrate } from './migrate'

const cli = cac(
    c.green('@ivanmaxlogiudice/eslint-config'),
)

// Migrate
cli
    .command('migrate', 'Migrate from legacy config to new flat config')
    .action(migrate)

cli.help()
cli.version(`${c.bold(version)}`)
cli.parse()

// Show the Help section if no command is given
if (!cli.matchedCommand)
    cli.outputHelp()
