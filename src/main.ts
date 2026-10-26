//  Copyright (C) 2026 Nethesis S.r.l.
//  SPDX-License-Identifier: GPL-3.0-or-later

import './style.css'
// applies the theme before the first render
import './composables/useTheme'

import { createApp } from 'vue'
import { config as fontawesomeConfig } from '@fortawesome/fontawesome-svg-core'
import App from './App.vue'

// fontawesome css is imported in style.css, in a lower layer than tailwind
fontawesomeConfig.autoAddCss = false

createApp(App).mount('#app')
