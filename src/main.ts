//  Copyright (C) 2026 Nethesis S.r.l.
//  SPDX-License-Identifier: GPL-3.0-or-later

import './style.css'

import { createApp } from 'vue'
import { config as fontawesomeConfig } from '@fortawesome/fontawesome-svg-core'
import App from './App.vue'

// fontawesome css is imported in style.css, in a lower layer than tailwind
fontawesomeConfig.autoAddCss = false

// follow the operating system theme
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
const applyTheme = () => document.documentElement.classList.toggle('dark', darkQuery.matches)
applyTheme()
darkQuery.addEventListener('change', applyTheme)

createApp(App).mount('#app')
