<!--
  Copyright (C) 2026 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, watch } from 'vue'
import { NeHeading, NeTabs } from '@nethesis/vue-components'
import GlossaryView from './components/GlossaryView.vue'
import GuidelinesView from './components/GuidelinesView.vue'

const tabs = [
  { name: 'glossary', label: 'Glossary' },
  { name: 'guidelines', label: 'Guidelines' }
]

const initialTab = new URLSearchParams(window.location.search).get('tab')
const selectedTab = ref(tabs.some((t) => t.name === initialTab) ? initialTab! : 'glossary')

watch(selectedTab, (tab) => {
  // each tab has its own query parameters and anchors
  const url = new URL(window.location.pathname, window.location.origin)
  if (tab !== 'glossary') url.searchParams.set('tab', tab)
  window.history.replaceState(null, '', url)
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <NeHeading tag="h3">Nethesis UX guidelines</NeHeading>
    <p class="mt-2 mb-6 max-w-2xl text-gray-500 dark:text-gray-400">
      Rules shared by the user interfaces of all Nethesis products: writing guidelines, and the
      glossary of terms with their Italian translations.
    </p>
    <NeTabs
      :tabs="tabs"
      :selected="selectedTab"
      sr-select-tab-label="Select a tab"
      sr-tabs-label="Sections"
      class="mb-8"
      @select-tab="selectedTab = $event"
    />
    <GlossaryView v-if="selectedTab === 'glossary'" />
    <GuidelinesView v-else />
    <footer class="mt-12 text-xs text-gray-500 dark:text-gray-400">
      To propose a change, open a pull request on
      <a href="https://github.com/NethServer/ux-guidelines" class="underline">NethServer/ux-guidelines</a>.
    </footer>
  </div>
</template>
