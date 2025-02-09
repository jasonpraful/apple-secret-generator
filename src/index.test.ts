import assert from 'node:assert'
import { describe, it, mock } from 'node:test'

import fs from 'fs'
import jwt from 'jsonwebtoken'

import { generateAppleSecret } from './index'

const privateKey = `-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIAZxZAgU6MNzjz2uSBxtGhKGbtJvJzwzlcJmprnAcupxoAoGCCqGSM49
AwEHoUQDQgAEu4DDbzWLh+wXJ7eOAgrIRK09PJ/n+vi0XyBkLwQIMBbhaBcOJUOB
ChCR0G8P2miavrCZPnV8x+39es/ESnf1Tg==
-----END EC PRIVATE KEY-----`

mock.method(fs, 'readFileSync', () => privateKey)
mock.method(Date, 'now', () => 1735689600000)

describe('appleSecretGenerator', () => {
  it('generates a valid Apple client secret', () => {
    assert.strictEqual(fs.readFileSync('key', 'utf8'), privateKey)
    assert.strictEqual(Date.now(), 1735689600000)
    const jwtToken = generateAppleSecret('key', '180', 'kid', 'team', 'client')
    assert.strictEqual(
      JSON.stringify(jwt.verify(jwtToken, privateKey)),
      JSON.stringify({
        iss: 'team',
        iat: 1735689600,
        exp: 1751241600,
        aud: 'https://appleid.apple.com',
        sub: 'client'
      })
    )
  })
})
