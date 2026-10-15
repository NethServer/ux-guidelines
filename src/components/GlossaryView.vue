<!--
  Copyright (C) 2026 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import {
  NeButton,
  NeDropdownFilterV2,
  NeEmptyState,
  NeTable,
  NeTableBody,
  NeTableCell,
  NeTableHead,
  NeTableHeadCell,
  NeTableRow,
  NeTextInput,
  type NeDropdownFilterV2Option
} from '@nethesis/vue-components'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBook,
  faCheck,
  faCircleXmark,
  faLink,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import glossary from '../generated/glossary.json'
import { PRODUCT_LABELS, type GlossaryEntry, type Product } from '../types'

const entries = [...(glossary as GlossaryEntry[])].sort((a, b) => a.en.localeCompare(b.en))

const productOptions: NeDropdownFilterV2Option[] = (
  Object.keys(PRODUCT_LABELS) as Product[]
)
  .filter((product) => product !== 'all')
  .map((product) => ({ id: product, label: PRODUCT_LABELS[product] }))

// filters are kept in the query string, so a filtered view can be shared
const params = new URLSearchParams(window.location.search)
const textFilter = ref(params.get('q') ?? '')
const productFilter = ref(
  productOptions.filter((o) => params.getAll('product').includes(o.id))
)

watch([textFilter, productFilter], () => {
  const url = new URL(window.location.href)
  url.searchParams.delete('q')
  url.searchParams.delete('product')
  if (textFilter.value) url.searchParams.set('q', textFilter.value)
  productFilter.value.forEach((o) => url.searchParams.append('product', o.id))
  window.history.replaceState(null, '', url)
})

// case and accent insensitive search
const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

const searchText = (entry: GlossaryEntry) =>
  normalize(
    [
      entry.en,
      entry.it ?? '',
      entry.definition,
      entry.notes ?? '',
      ...(entry.avoid?.en ?? []),
      ...(entry.avoid?.it ?? [])
    ].join(' ')
  )

const filteredEntries = computed(() => {
  const query = normalize(textFilter.value.trim())
  const products = productFilter.value.map((o) => o.id)

  return entries.filter(
    (entry) =>
      (!query || searchText(entry).includes(query)) &&
      (!products.length ||
        entry.products.includes('all') ||
        entry.products.some((p) => products.includes(p)))
  )
})

const isFiltered = computed(
  () => !!textFilter.value || !!productFilter.value.length
)

function resetFilters() {
  textFilter.value = ''
  productFilter.value = []
}

const productsText = (entry: GlossaryEntry) =>
  entry.products.map((product) => PRODUCT_LABELS[product]).join(', ')

const avoidTerms = (entry: GlossaryEntry) => [
  ...(entry.avoid?.en ?? []),
  ...(entry.avoid?.it ?? [])
]

// a link like #term-delete highlights and scrolls to that term
const highlightedId = ref('')

function readHash() {
  highlightedId.value = window.location.hash.startsWith('#term-')
    ? window.location.hash.slice('#term-'.length)
    : ''
}

// copies a link to a term, without filters so the term is always visible
const copiedId = ref('')
let copiedTimeout: ReturnType<typeof setTimeout> | undefined

async function copyLink(entry: GlossaryEntry) {
  const url = new URL(window.location.pathname, window.location.origin)
  url.hash = `term-${entry.id}`
  try {
    await navigator.clipboard.writeText(url.href)
  } catch {
    // no clipboard access: at least show the link in the address bar
    window.history.replaceState(null, '', url)
  }
  copiedId.value = entry.id
  clearTimeout(copiedTimeout)
  copiedTimeout = setTimeout(() => (copiedId.value = ''), 2000)
}

onMounted(async () => {
  readHash()
  window.addEventListener('hashchange', readHash)
  if (highlightedId.value) {
    await nextTick()
    document.getElementById(`term-${highlightedId.value}`)?.scrollIntoView({ block: 'center' })
  }
})
</script>

<template>
  <div>
    <NeEmptyState
      v-if="!entries.length"
      :icon="faBook"
      title="No terms"
      description="Approved terms will appear here."
      class="bg-white dark:bg-gray-950"
    />
    <template v-else>
      <div class="mb-6 flex flex-wrap items-center gap-4">
        <NeTextInput
          v-model="textFilter"
          is-search
          placeholder="Filter terms"
          clear-search-label="Clear"
          class="max-w-48 sm:max-w-sm"
        />
        <NeDropdownFilterV2
          v-model="productFilter"
          kind="checkbox"
          label="Product"
          :options="productOptions"
          clear-filter-label="Clear selection"
          open-menu-aria-label="Open filter"
          no-options-label="No options"
          more-options-hidden-label="Continue typing to show more options"
          clear-search-label="Clear"
        />
        <NeButton v-if="isFiltered" kind="tertiary" @click="resetFilters">Reset filters</NeButton>
      </div>
      <NeEmptyState
        v-if="!filteredEntries.length"
        :icon="faMagnifyingGlass"
        title="No terms found"
        description="Try changing your search filters"
        class="bg-white dark:bg-gray-950"
      >
        <NeButton kind="tertiary" size="lg" @click="resetFilters">Reset filters</NeButton>
      </NeEmptyState>
      <NeTable v-else aria-label="Glossary" card-breakpoint="lg">
        <NeTableHead>
          <NeTableHeadCell>English</NeTableHeadCell>
          <NeTableHeadCell>Italian</NeTableHeadCell>
          <NeTableHeadCell>Definition</NeTableHeadCell>
          <NeTableHeadCell>Products</NeTableHeadCell>
          <NeTableHeadCell>Don't use</NeTableHeadCell>
        </NeTableHead>
        <NeTableBody>
          <NeTableRow
            v-for="entry in filteredEntries"
            :id="`term-${entry.id}`"
            :key="entry.id"
            :class="{ 'bg-primary-100 dark:bg-primary-900': entry.id === highlightedId }"
          >
            <NeTableCell data-label="English">
              <div class="flex items-center gap-1">
                <span class="font-medium">{{ entry.en }}</span>
                <NeButton
                  kind="tertiary"
                  size="xs"
                  :title="copiedId === entry.id ? 'Link copied' : 'Copy link'"
                  @click="copyLink(entry)"
                >
                  <FontAwesomeIcon
                    :icon="copiedId === entry.id ? faCheck : faLink"
                    class="size-3"
                    aria-hidden="true"
                  />
                  <span class="sr-only">
                    {{ copiedId === entry.id ? 'Link copied' : `Copy link to ${entry.en}` }}
                  </span>
                </NeButton>
              </div>
            </NeTableCell>
            <NeTableCell data-label="Italian">
              <span v-if="entry.untranslatable" class="text-gray-500 dark:text-gray-400">
                Not translated
              </span>
              <template v-else>{{ entry.it }}</template>
            </NeTableCell>
            <NeTableCell data-label="Definition">
              <div class="max-w-md whitespace-normal">
                {{ entry.definition }}
                <p v-if="entry.notes" class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {{ entry.notes }}
                </p>
              </div>
            </NeTableCell>
            <NeTableCell data-label="Products">{{ productsText(entry) }}</NeTableCell>
            <NeTableCell data-label="Don't use">
              <ul class="flex flex-col gap-2">
                <li v-for="term in avoidTerms(entry)" :key="term" class="flex items-start gap-1.5">
                  <FontAwesomeIcon
                    :icon="faCircleXmark"
                    class="mt-0.5 size-4 shrink-0 text-rose-500 dark:text-rose-400"
                    aria-hidden="true"
                  />
                  {{ term }}
                </li>
              </ul>
            </NeTableCell>
          </NeTableRow>
        </NeTableBody>
      </NeTable>
    </template>
  </div>
</template>
