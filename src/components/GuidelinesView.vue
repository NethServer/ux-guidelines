<!--
  Copyright (C) 2026 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import Guidelines, { toc } from '../../content/writing-guidelines.md'
</script>

<template>
  <div class="flex flex-col gap-8 lg:flex-row-reverse lg:justify-end">
    <nav aria-label="Guidelines sections" class="lg:sticky lg:top-22 lg:self-start">
      <ul class="flex flex-wrap gap-x-4 gap-y-1 text-sm lg:flex-col">
        <li v-for="section in toc" :key="section.id">
          <a
            :href="`#${section.id}`"
            class="text-gray-600 hover:text-primary-700 dark:text-gray-300 dark:hover:text-primary-500"
          >
            {{ section.title }}
          </a>
        </li>
      </ul>
    </nav>
    <article class="markdown">
      <Guidelines />
    </article>
  </div>
</template>
