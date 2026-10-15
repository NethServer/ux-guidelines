// Copyright (C) 2026 Nethesis S.r.l.
// SPDX-License-Identifier: GPL-3.0-or-later

// Validates glossary.yaml, then generates:
//   - glossary/it.tbx            Weblate glossary
//   - src/generated/glossary.json   data for the web page
//
// guidelines.md is compiled by scripts/vite-plugin-guidelines.mjs.
//
// With --check, nothing is written: the script fails if glossary/it.tbx is
// not up to date with glossary.yaml (used by CI).

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'
import { slug } from './slug.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const checkOnly = process.argv.includes('--check')

const PRODUCTS = ['all', 'ns8', 'nethsecurity', 'nethvoice', 'nethservice', 'neth360', 'my']
const FIELDS = ['id', 'en', 'it', 'untranslatable', 'definition', 'products', 'avoid', 'notes']
const TARGET_LANGUAGES = ['it']

const xml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// validation

const entries = parse(readFileSync(join(root, 'glossary.yaml'), 'utf8'))
const errors = []

if (!Array.isArray(entries)) {
  console.error('glossary.yaml must be a list of entries')
  process.exit(1)
}

const ids = new Set()
const enTerms = new Map()

for (const [index, entry] of entries.entries()) {
  const where = `entry ${index + 1} (${entry.id ?? 'no id'})`

  if (!entry.id || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(entry.id)) {
    errors.push(`${where}: id must be a lowercase slug`)
  } else if (ids.has(entry.id)) {
    errors.push(`${where}: duplicate id`)
  }
  ids.add(entry.id)

  if (!entry.en) errors.push(`${where}: missing en`)
  if (!entry.definition) errors.push(`${where}: missing definition`)
  if (entry.untranslatable && entry.it) {
    errors.push(`${where}: an untranslatable entry cannot have an it translation`)
  }
  if (!entry.untranslatable && !entry.it) errors.push(`${where}: missing it`)
  for (const field of Object.keys(entry)) {
    if (!FIELDS.includes(field)) errors.push(`${where}: unknown field "${field}"`)
  }
  if (!Array.isArray(entry.products) || entry.products.length === 0) {
    errors.push(`${where}: products must be a non-empty list`)
  } else {
    for (const product of entry.products) {
      if (!PRODUCTS.includes(product)) errors.push(`${where}: unknown product "${product}"`)
    }
  }

  const key = entry.en?.toLowerCase()
  if (key && enTerms.has(key)) errors.push(`${where}: "${entry.en}" is already defined`)
  enTerms.set(key, entry.id)

  for (const lang of ['en', 'it']) {
    for (const word of entry.avoid?.[lang] ?? []) {
      if (word === entry[lang]) errors.push(`${where}: "${word}" is both preferred and avoided`)
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

// TBX for Weblate: https://docs.weblate.org/en/latest/formats/tbx.html

function tbx(lang) {
  const body = []

  for (const entry of entries) {
    const notes = entry.notes ? `\n<descrip type="Usage note">${xml(entry.notes)}</descrip>` : ''

    if (entry.untranslatable) {
      body.push(`<termEntry id="${entry.id}">
<descrip>${xml(entry.definition)}</descrip>${notes}
<descrip type="Translation needed">No</descrip>
<langSet xml:lang="en">
<tig>
<term>${xml(entry.en)}</term>
</tig>
</langSet>
</termEntry>`)
    } else {
      body.push(`<termEntry id="${entry.id}">
<descrip>${xml(entry.definition)}</descrip>${notes}
<langSet xml:lang="en">
<tig>
<term>${xml(entry.en)}</term>
</tig>
</langSet>
<langSet xml:lang="${lang}">
<tig>
<term>${xml(entry[lang])}</term>
</tig>
</langSet>
</termEntry>`)
    }

    // each translation to avoid becomes a forbidden pair, also for terms
    // that stay in English
    for (const word of entry.avoid?.[lang] ?? []) {
      body.push(`<termEntry id="${entry.id}--forbidden-${slug(word)}">
<langSet xml:lang="en">
<tig>
<term>${xml(entry.en)}</term>
<termNote type="administrativeStatus">forbidden</termNote>
</tig>
</langSet>
<langSet xml:lang="${lang}">
<tig>
<term>${xml(word)}</term>
</tig>
</langSet>
</termEntry>`)
    }
  }

  return `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE martif PUBLIC "ISO 12200:1999A//DTD MARTIF core (DXFcdV04)//EN" "TBXcdv04.dtd">
<!-- Generated from glossary.yaml by scripts/build-data.mjs: do not edit. -->
<martif type="TBX" xml:lang="en">
<martifHeader>
<fileDesc>
<sourceDesc>
<p>Nethesis UX glossary</p>
</sourceDesc>
</fileDesc>
</martifHeader>
<text>
<body>
${body.join('\n')}
</body>
</text>
</martif>
`
}

let stale = false

for (const lang of TARGET_LANGUAGES) {
  const path = join(root, 'glossary', `${lang}.tbx`)
  const content = tbx(lang)

  if (checkOnly) {
    let current = ''
    try {
      current = readFileSync(path, 'utf8')
    } catch {
      // missing file is reported as stale below
    }
    if (current !== content) {
      console.error(`glossary/${lang}.tbx is not up to date: run "npm run build:data" and commit it`)
      stale = true
    }
  } else {
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, content)
  }
}

if (checkOnly) {
  if (stale) process.exit(1)
  console.log(`glossary.yaml is valid (${entries.length} entries) and the TBX files are up to date`)
  process.exit(0)
}

// data for the web page

const generated = join(root, 'src', 'generated')
mkdirSync(generated, { recursive: true })
writeFileSync(join(generated, 'glossary.json'), JSON.stringify(entries, null, 2))

console.log(`Generated ${TARGET_LANGUAGES.map((l) => `glossary/${l}.tbx`).join(', ')} and page data`)
