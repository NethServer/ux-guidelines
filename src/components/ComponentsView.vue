<!--
  Copyright (C) 2026 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import Components from '../../content/components.md'
import { COMPONENT_PAGES, pageHref } from '../pages'
</script>

<template>
  <ul class="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    <li v-for="page in COMPONENT_PAGES" :key="page.id">
      <a
        :href="pageHref(page)"
        class="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-5 transition-colors hover:border-primary-700 focus-visible:outline-2 focus-visible:outline-primary-700 dark:border-gray-700 dark:bg-gray-950 dark:hover:border-primary-500 dark:focus-visible:outline-primary-500"
      >
        <span class="font-medium text-gray-900 dark:text-gray-50">{{ page.title }}</span>
        <span class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {{ page.description }}
        </span>
      </a>
    </li>
  </ul>
  <article class="markdown">
    <Components />
  </article>
</template>
