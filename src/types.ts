//  Copyright (C) 2026 Nethesis S.r.l.
//  SPDX-License-Identifier: GPL-3.0-or-later

export type Product = 'all' | 'ns8' | 'nethsecurity' | 'nethvoice' | 'nethvoice-cti' | 'my'
export type Status = 'approved' | 'proposed' | 'to-decide' | 'deprecated'

export type GlossaryEntry = {
  id: string
  en: string
  it?: string
  untranslatable?: boolean
  definition: string
  products: Product[]
  avoid?: { en?: string[]; it?: string[] }
  status: Status
  notes?: string
}

export const PRODUCT_LABELS: Record<Product, string> = {
  all: 'All products',
  ns8: 'NS8',
  nethsecurity: 'NethSecurity',
  nethvoice: 'NethVoice',
  'nethvoice-cti': 'NethVoice CTI',
  my: 'My'
}

export const STATUS_LABELS: Record<Status, string> = {
  approved: 'Approved',
  proposed: 'Proposed',
  'to-decide': 'To decide',
  deprecated: 'Deprecated'
}

