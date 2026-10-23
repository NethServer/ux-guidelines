# Nethesis UX guidelines

Rules shared by the user interfaces of all Nethesis products (NethServer 8, NethSecurity,
NethVoice, NethService, Neth360 and My Nethesis), whatever technology they are built with:
writing guidelines, and the glossary of terms with their Italian translations.

Components and their usage are documented in the
[vue-components Storybook](https://nethesis.github.io/vue-components/).

Read it at https://nethserver.github.io/ux-guidelines/.

## Files

| File | Purpose |
| --- | --- |
| `glossary.yaml` | The glossary: single source of truth, edited through pull requests. The comment at the top describes the fields |
| `guidelines.md` | Writing guidelines: plain markdown, no HTML or images. Tables with a "Do \| Don't" header are shown with check and cross marks |
| `glossary/it.tbx` | Italian glossary for Weblate, generated from `glossary.yaml` (do not edit) |
| `scripts/build-data.mjs` | Validates `glossary.yaml` and generates the TBX files and the page data |
| `scripts/vite-plugin-guidelines.mjs` | Compiles `guidelines.md` into a Vue component, rejecting raw HTML and unsafe links (tests in `vite-plugin-guidelines.test.mjs`) |
| `scripts/vite-plugin-glossary-watch.mjs` | Dev server only: reruns `build-data.mjs` when `glossary.yaml` is saved |
| `src/` | Searchable web page (Vue, `@nethesis/vue-components`), published on GitHub Pages |

## Workflow

1. Edit `glossary.yaml` or `guidelines.md`.
2. Regenerate `glossary/it.tbx` with `npm run build:data` (the dev server does it on save), and
   commit it.
3. Open a pull request. CI validates the glossary and the guidelines, and fails if the TBX files
   are not up to date.
4. On merge, CI publishes the page and Weblate reads the new `glossary/it.tbx`.

`glossary.yaml` contains approved terms only: every entry is exported to Weblate, so add a term
once it has been agreed. Translations listed under `avoid.it` become forbidden translations.

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

The dev server runs on http://localhost:5179 and regenerates the glossary data whenever
`glossary.yaml` is saved: validation errors appear in the terminal and in the browser.

In development only, each glossary entry has a "Reviewed" checkbox and the list has a Review
filter: the marks are saved in the browser and an entry edited after its review shows "Changed
since review".

`npm test` runs the tests of the guidelines plugin, including the security ones. `npm run build` builds the page
into `dist/`.
