<!--
  Copyright (C) 2026 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import {
  NeBadgeV2,
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
  type NeBadgeV2Kind,
  type NeDropdownFilterV2Option
} from '@nethesis/vue-components'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import glossary from '../generated/glossary.json'
import {
  PRODUCT_LABELS,
  STATUS_LABELS,
  type GlossaryEntry,
  type Product,
  type Status
} from '../types'

const entries = [...(glossary as GlossaryEntry[])].sort((a, b) => a.en.localeCompare(b.en))

const STATUS_BADGE: Record<Status, NeBadgeV2Kind> = {
  approved: 'green',
  proposed: 'blue',
  'to-decide': 'amber',
  deprecated: 'gray'
}

const productOptions: NeDropdownFilterV2Option[] = (
  Object.keys(PRODUCT_LABELS) as Product[]
)
  .filter((product) => product !== 'all')
  .map((product) => ({ id: product, label: PRODUCT_LABELS[product] }))

const statusOptions: NeDropdownFilterV2Option[] = (Object.keys(STATUS_LABELS) as Status[]).map(
  (status) => ({ id: status, label: STATUS_LABELS[status] })
)

// filters are kept in the query string, so a filtered view can be shared
const params = new URLSearchParams(window.location.search)
const textFilter = ref(params.get('q') ?? '')
const productFilter = ref(
  productOptions.filter((o) => params.getAll('product').includes(o.id))
)
const statusFilter = ref(statusOptions.filter((o) => params.getAll('status').includes(o.id)))

watch([textFilter, productFilter, statusFilter], () => {
  const url = new URL(window.location.href)
  url.searchParams.delete('q')
  url.searchParams.delete('product')
  url.searchParams.delete('status')
  if (textFilter.value) url.searchParams.set('q', textFilter.value)
  productFilter.value.forEach((o) => url.searchParams.append('product', o.id))
  statusFilter.value.forEach((o) => url.searchParams.append('status', o.id))
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
  const statuses = statusFilter.value.map((o) => o.id)

  return entries.filter(
    (entry) =>
      (!query || searchText(entry).includes(query)) &&
      (!products.length ||
        entry.products.includes('all') ||
        entry.products.some((p) => products.includes(p))) &&
      (!statuses.length || statuses.includes(entry.status))
  )
})

const isFiltered = computed(
  () => !!textFilter.value || !!productFilter.value.length || !!statusFilter.value.length
)

function resetFilters() {
  textFilter.value = ''
  productFilter.value = []
  statusFilter.value = []
}

const productsText = (entry: GlossaryEntry) =>
  entry.products.map((product) => PRODUCT_LABELS[product]).join(', ')

const avoidText = (entry: GlossaryEntry) =>
  [...(entry.avoid?.en ?? []), ...(entry.avoid?.it ?? [])].join(', ')

// a link like #term-delete highlights and scrolls to that term
const highlightedId = ref('')

function readHash() {
  highlightedId.value = window.location.hash.startsWith('#term-')
    ? window.location.hash.slice('#term-'.length)
    : ''
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
      <NeDropdownFilterV2
        v-model="statusFilter"
        kind="checkbox"
        label="Status"
        :options="statusOptions"
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
        <NeTableHeadCell>Status</NeTableHeadCell>
      </NeTableHead>
      <NeTableBody>
        <NeTableRow
          v-for="entry in filteredEntries"
          :id="`term-${entry.id}`"
          :key="entry.id"
          :class="{ 'bg-primary-50 dark:bg-primary-950': entry.id === highlightedId }"
        >
          <NeTableCell data-label="English">
            <a :href="`#term-${entry.id}`" class="font-medium hover:underline">{{ entry.en }}</a>
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
            <span class="text-rose-700 line-through dark:text-rose-400">{{ avoidText(entry) }}</span>
          </NeTableCell>
          <NeTableCell data-label="Status">
            <NeBadgeV2 :kind="STATUS_BADGE[entry.status]">
              {{ STATUS_LABELS[entry.status] }}
            </NeBadgeV2>
          </NeTableCell>
        </NeTableRow>
      </NeTableBody>
    </NeTable>
  </div>
</template>
