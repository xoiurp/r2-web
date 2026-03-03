/// <reference types="node" />

import path from 'node:path'
import fs from 'node:fs/promises'
import { version } from '../package.json' with { type: 'json' }

const constantsString = await fs.readFile(
  path.resolve(import.meta.dirname, '../src/js/constants.ts'),
  'utf-8',
)

constantsString.replace(
  /export const VERSION = ['"](.*?)['"];?/g,
  `export const VERSION = '${version}'`,
)

constantsString.replace(
  /export const UPDATED_AT = ['"](.*?)['"];?/g,
  `export const UPDATED_AT = '${new Date().toISOString()}'`,
)

await fs.writeFile(path.resolve(import.meta.dirname, '../src/js/constants.ts'), constantsString)
