/// <reference types="node" />

import path from 'node:path'
import fs from 'node:fs/promises'
import pkg from '../package.json' with { type: 'json' }

const constantsString = await fs.readFile(
  path.resolve(import.meta.dirname, '../src/js/constants.js'),
  'utf-8',
)

constantsString.replace(
  /export const VERSION = ['"](.*?)['"];?/g,
  `export const VERSION = '${pkg.version}'`,
)

constantsString.replace(
  /export const UPDATED_AT = ['"](.*?)['"];?/g,
  `export const UPDATED_AT = '${new Date().toISOString()}'`,
)

await fs.writeFile(path.resolve(import.meta.dirname, '../src/js/constants.js'), constantsString)
