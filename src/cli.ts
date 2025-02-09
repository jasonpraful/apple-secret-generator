#!/usr/bin/env node

import { Command } from '@commander-js/extra-typings'
import fs from 'fs'

import { generateAppleSecret } from '.'

const program = new Command()
  .option(
    '-k, --key <key>',
    'Path to the private key (default: key.p8)',
    'key.p8'
  )
  .option(
    '-d, --days <days>',
    'Number of days the token is valid for (default: 180)',
    '180'
  )
  .option('-i, --kid <kid>', 'Key ID')
  .option('-t, --team <team>', 'Team ID')
  .option('-c, --client <client>', 'Client ID')
  .parse(process.argv)

const opts = program.opts()

if (!opts.kid) {
  console.error('Please provide the Key ID')
  process.exit(1)
}
if (!opts.team) {
  console.error('Please provide the Team ID')
  process.exit(1)
}
if (!opts.client) {
  console.error('Please provide the Client ID')
  process.exit(1)
}

if (!fs.existsSync(opts.key)) {
  console.error('Private key not found')
  process.exit(1)
}

console.log(
  generateAppleSecret(
    opts.key,
    parseInt(opts.days),
    opts.kid,
    opts.team,
    opts.client
  )
)
