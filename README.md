# Nethesis UX writing guide

How to write the user interfaces of Nethesis products (NS8, NethSecurity, NethVoice, NethVoice
CTI and My): style rules, and the glossary of terms with their Italian translations.

## Files

| File | Purpose |
| --- | --- |
| `glossary.yaml` | The glossary: single source of truth, edited through pull requests |
| `guidelines.md` | Writing guidelines: plain markdown, no HTML or images |
| `glossary/it.tbx` | Italian glossary for Weblate, generated from `glossary.yaml` (do not edit) |
| `scripts/build-data.mjs` | Validates `glossary.yaml` and generates the TBX files and the page data |
| `scripts/vite-plugin-guidelines.mjs` | Compiles `guidelines.md` into a Vue component, rejecting raw HTML and unsafe links |
| `src/` | Searchable web page (Vue, `@nethesis/vue-components`), published on GitHub Pages |

## Workflow

1. Edit `glossary.yaml` or `guidelines.md`.
2. Run `npm run build:data` to regenerate `glossary/it.tbx`, and commit it.
3. Open a pull request. CI validates the glossary and the guidelines, and fails if the TBX files
   are not up to date.
4. On merge, CI publishes the page and Weblate reads the new `glossary/it.tbx`.

Only entries with `status: approved` are exported to Weblate. Translations listed under
`avoid.it` become forbidden translations.

## Weblate

The glossary is a component of the `ns8` project on hosted.weblate.org, so it applies to every
Nethesis component there.

- File format: TermBase eXchange file
- File mask: `glossary/*.tbx`
- Monolingual base language file: empty
- "Use as a glossary": on
- Lock the component, or restrict its permissions: changes come from this repository only.

## Development

```sh
npm install
npm run dev
```

`npm test` runs the security tests of the guidelines plugin. `npm run build` builds the page
into `dist/`.
