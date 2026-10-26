# Figma fixes

Changes to make in the [NDS Figma file](https://www.figma.com/design/ZRZzzlqb9GfB9Xdz6iGufh/NDS) so
that it agrees with this guide. Remove an item once it is done.

## Text to correct

- [ ] **Writing guidelines** page, *Writing guidelines 2*, Labels: "Do not include instructions in
  the label" needs the exception `Confirm new password`.
- [ ] **Writing guidelines** page, *Writing guidelines 2*, Placeholder: "Use placeholders only to
  show an example or expected format" and "Avoid instructional sentences inside the field" are too
  strict. A placeholder can also say what to do, such as `Filter <objects>`.
- [ ] **Writing guidelines** page, *Writing guidelines 2*, Validation messages: for an empty
  required field, allow `Required` or a positive instruction that names what is missing
  (`Enter a username`, `Select a language`).
- [ ] **Empty state** page, *Empty state_writing-guidelines*: the example "Threat shield DNS is
  disabled" becomes "Threat Shield DNS is disabled". Check other occurrences of "Threat shield" in
  the file.
- [ ] **Modal** page, *modal_guidelines*: the example `Speed dial “Jenny Wilson” will be deleted.`
  loses the quotes: `Speed dial Jenny Wilson will be deleted.`
- [ ] **Toast Notification** page, *Toast Notification_Guideline and use cases*: the Italian
  example "La segreteria per l'interno 101 è stata attivata" becomes "… è stata abilitata"
  (Enable is *Abilita*, not *Attiva*).
- [ ] **Toast Notification** page, *Toast Notification_Guideline and use cases*: "Toast
  descriptions do not require a final period" becomes "Omit the final period when the description
  is one short sentence; use normal punctuation when it has more sentences", as on the Writing
  guidelines page.

- [ ] **Colors** page, *Colors documentation*: typos "sush" (such) in the Text token description,
  and "Emerald /500" (Emerald/500) in the NethVoice Product Primary table.

- [ ] **Spacing and border** page, *Border radius* table: the names follow Tailwind 3 (`Rounded sm`,
  `Rounded`, `Rounded md`…), while the variables follow Tailwind 4 (`rounded-xs` 2 px,
  `rounded-sm` 4 px, `rounded-md` 6 px…). Rename the rows as the variables.

## To complete or remove

- [ ] **Table** page, *Guideline and use cases*: still the template, with placeholder text. Fill
  it in or remove it.

## Questions for the designer

- [ ] **Spacing and border** page, *Focus ring*: when is the "Focus ring/2 … primary" effect style
  (shade 700) used instead of "Focus ring/2" (shade 500)? In vue-components the primary button
  uses shade 500, and shade 700 appears only on the focused card of `NeCheckboxCards` and
  `NeRadioSelection`.

## Once the writing rules live in this guide

- [ ] Replace the writing rules in Figma (Writing guidelines page and the writing sections of the
  component pages) with a short link to the corresponding section of
  https://nethserver.github.io/ux-guidelines/, so there is a single source.
