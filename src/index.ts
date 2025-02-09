import jwt from 'jsonwebtoken'
import fs from 'fs'

/**
 *
 * @param key - Path to the private key. Derive from https://developer.apple.com/account/resources/authkeys/list (default: `key.p8`)
 * @param days - Number of days the token is valid for. Maximum supported value is 180 (default: `180`)
 * @param kid - Key ID - Identifier for the key. Derive from https://developer.apple.com/account/resources/authkeys/list
 * @param team - Team ID - Identifier for the team. Derive from https://developer.apple.com/account/#/membership/
 * @param client - Client ID - Identifier for the client. Derive from https://developer.apple.com/account/resources/identifiers/add/bundleId
 * @returns Apple client secret
 */
export const generateAppleSecret = (
  key: string = 'key.p8',
  days: number = 180,
  kid: string,
  team: string,
  client: string
): string => {
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
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * days,
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
