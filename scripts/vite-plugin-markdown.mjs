// Copyright (C) 2026 Nethesis S.r.l.
// SPDX-License-Identifier: GPL-3.0-or-later

// Vite plugin that turns the markdown pages in content/ into Vue components at
// build time.
//
// marked converts the markdown to HTML, which becomes the template of a Vue
// component compiled by @vitejs/plugin-vue: the page gets static elements,
// with no v-html and no markdown parser at runtime.
//
// The markdown is treated as untrusted text, not as code:
//   - raw HTML, images and unsafe links fail the build;
//   - the template is wrapped in v-pre, so {{ }} and directives written in
//     the text are never evaluated;
//   - Vue parses the template again and decodes HTML entities, so the final
//     check runs on Vue's own syntax tree: only the elements and attributes
//     that plain markdown produces are accepted.
//
// Tables whose header is "Do | Don't" get the do-dont class, styled with
// check and cross marks.
//
// Each page also exports `toc`, the list of its level 2 headings.

import { fileURLToPath } from 'node:url'
import { Marked, Renderer } from 'marked'
import { parse } from 'vue/compiler-sfc'
import { slug } from './slug.mjs'

export const CONTENT_DIR = fileURLToPath(new URL('../content/', import.meta.url))

// the markdown files inside content/ and content/components/
export const CONTENT_PAGE = new RegExp(
  `^${CONTENT_DIR.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(components/)?[^/]+\\.md$`
)

// table headers that get check and cross marks
const DO_DONT_HEADERS = ["Do|Don't", 'When to use|When not to use']

// web pages, anchors, paths and other pages of the site (?page=glossary)
const SAFE_HREF = /^(https?:\/\/|#|\.{0,2}\/|[a-z0-9-]+(\/|$)|\?page=[a-z0-9-]+(#[a-z0-9-]+)?$)/i

// elements that plain markdown produces, with the values allowed for each
// attribute
const ALLOWED = {
  h1: { id: /^[a-z0-9-]+$/ },
  h2: { id: /^[a-z0-9-]+$/ },
  h3: { id: /^[a-z0-9-]+$/ },
  h4: { id: /^[a-z0-9-]+$/ },
  p: {},
  ul: {},
  ol: { start: /^\d+$/ },
  li: {},
  blockquote: {},
  hr: {},
  br: {},
  strong: {},
  em: {},
  del: {},
  code: { class: /^language-[a-z0-9-]+$/ },
  pre: {},
  table: { class: /^do-dont$/ },
  thead: {},
  tbody: {},
  tr: {},
  th: { align: /^(left|center|right)$/ },
  td: { align: /^(left|center|right)$/ },
  a: { href: SAFE_HREF, title: /^/, target: /^_blank$/, rel: /^noopener noreferrer$/ }
}

// @vue/compiler-core NodeTypes
const ELEMENT = 1
const TEXT = 2
const ATTRIBUTE = 6

const escape = (text) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const plainText = (tokens = []) =>
  tokens.map((token) => (token.tokens ? plainText(token.tokens) : token.text)).join('')

// With omitSummary, the first paragraph is not rendered: the page shows it in
// its header, from the exported summary.
export function renderMarkdown(markdown, filename = 'page.md', { omitSummary = false } = {}) {
  const errors = []
  const ids = new Set()
  const toc = []
  let title = ''
  let summary = null

  const marked = new Marked({
    async: false,
    walkTokens(token) {
      if (token.type === 'html') {
        errors.push(`raw HTML is not allowed: ${token.raw.trim()}`)
      } else if (token.type === 'image') {
        errors.push(`images are not allowed: ${token.raw}`)
      } else if (token.type === 'link' && !SAFE_HREF.test(token.href)) {
        errors.push(`unsafe link: ${token.href}`)
      }
    },
    renderer: {
      table(token) {
        const html = Renderer.prototype.table.call(this, token)
        const header = token.header.map((cell) => plainText(cell.tokens))
        return DO_DONT_HEADERS.includes(header.join('|'))
          ? html.replace(/^<table>/, '<table class="do-dont">')
          : html
      },
      paragraph(token) {
        if (summary === null) {
          summary = plainText(token.tokens)
          if (omitSummary) return ''
        }
        return Renderer.prototype.paragraph.call(this, token)
      },
      heading({ tokens, depth }) {
        const text = plainText(tokens)
        const id = slug(text)
        if (ids.has(id)) errors.push(`duplicate heading: ${text}`)
        ids.add(id)
        if (depth === 1 && !title) title = text
        if (depth === 2) toc.push({ id, title: text })
        return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`
      },
      link({ href, title, tokens }) {
        // links to other sites open in a new tab
        const external = /^https?:\/\//i.test(href)
          ? ' target="_blank" rel="noopener noreferrer"'
          : ''
        const titleAttribute = title ? ` title="${escape(title)}"` : ''
        return `<a href="${escape(href)}"${titleAttribute}${external}>${this.parser.parseInline(tokens)}</a>`
      }
    }
  })

  const html = marked.parse(markdown)
  const json = (value) => JSON.stringify(value).replace(/</g, '\\u003c')
  const sfc = `<script>
export const title = ${json(title)}
export const summary = ${json(summary ?? '')}
export const toc = ${json(toc)}
</script>

<template>
<div v-pre>${html}</div>
</template>
`

  // check what Vue will compile
  const { descriptor, errors: parseErrors } = parse(sfc, { filename })
  errors.push(...parseErrors.map((error) => error.message))

  const root = descriptor.template?.ast?.children.filter((node) => node.type !== TEXT) ?? []
  if (root.length !== 1 || root[0].tag !== 'div') errors.push('unexpected template root')

  const check = (node) => {
    if (node.type === TEXT) return
    if (node.type !== ELEMENT || !Object.hasOwn(ALLOWED, node.tag)) {
      errors.push(`unexpected element: ${node.loc.source.slice(0, 80)}`)
      return
    }
    for (const prop of node.props) {
      const allowed = ALLOWED[node.tag][prop.name]
      if (prop.type !== ATTRIBUTE || !allowed || !allowed.test(prop.value?.content ?? '')) {
        errors.push(`unexpected attribute: ${prop.loc.source}`)
      }
    }
    node.children.forEach(check)
  }
  root[0]?.children.forEach(check)

  return { sfc, errors }
}

export default function markdownPages() {
  return {
    name: 'nethesis:markdown',
    enforce: 'pre',
    transform(markdown, id) {
      if (!CONTENT_PAGE.test(id)) return
      const file = id.slice(CONTENT_DIR.length)
      const { sfc, errors } = renderMarkdown(markdown, id, {
        omitSummary: file.startsWith('components/')
      })
      if (errors.length) this.error(`content/${file}:\n${errors.join('\n')}`)
      return { code: sfc, map: null }
    }
  }
}
