//  Copyright (C) 2026 Nethesis S.r.l.
//  SPDX-License-Identifier: GPL-3.0-or-later

export type Product = 'all' | 'ns8' | 'nethsecurity' | 'nethvoice' | 'my'

export type GlossaryEntry = {
  id: string
  en: string
  it?: string
  untranslatable?: boolean
  definition: string
  products: Product[]
  avoid?: { en?: string[]; it?: string[] }
  notes?: string
}

export const PRODUCT_LABELS: Record<Product, string> = {
  all: 'All products',
  ns8: 'NethServer 8',
  nethsecurity: 'NethSecurity',
  nethvoice: 'NethVoice',
  my: 'My Nethesis'
}

