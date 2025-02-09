import jwt from 'jsonwebtoken'
import fs from 'fs'
import { Command } from '@commander-js/extra-typings'

export const generateAppleSecret = (
  key: string,
  days: string,
  kid: string,
  team: string,
  client: string
) => {
  let privateKey
  try {
    privateKey = fs.readFileSync(key, 'utf8')
  } catch (err) {
    console.error('Failed to read the private key')
    process.exit(1)
  }

  const ClientSecret = jwt.sign(
    {
      iss: team,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * parseInt(days),
      aud: 'https://appleid.apple.com',
      sub: client
    },
    privateKey,
    {
      header: {
        kid,
        alg: 'ES256'
      }
    }
  )
  return ClientSecret
}

const main = () => {
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
    generateAppleSecret(opts.key, opts.days, opts.kid, opts.team, opts.client)
  )
}

if (require.main === module) {
  main()
}
