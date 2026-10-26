# Dropdown filter

Dropdown filters narrow down the content of a page by one category of data.

Code: `NeDropdownFilterV2` · [Storybook](https://nethesis.github.io/vue-components/?path=/docs/components-nedropdownfilterv2--docs) · [Figma](https://www.figma.com/design/ZRZzzlqb9GfB9Xdz6iGufh/NDS?node-id=234-17921)

## When to use

| When to use | When not to use |
| --- | --- |
| To filter a list, a table or a collection by one category of data | For actions or navigation: use a dropdown |
| When users may select one or more values | |
| When the values fit in a compact menu | |
| When the selection must stay visible after the menu closes | |
| When several filters refine the same content together | |

## General rules

- Each filter represents one clear category of data, with the same terms as the related table and page.
- Each filter has a default state. Restoring the default does not necessarily remove every selection.
- Selections apply immediately, without a confirmation.

## Selection

- The menu stays open while users select or deselect options, and closes when they click outside it or open another filter.
- The trigger shows the number of selected options after the label, including default selections. Don't show a zero count, and don't replace the label with the selected values.
- Selections are kept when the menu is closed and opened again.

## Default state and reset

- **Clear selection** removes all selections from a filter with no default selections.
- **Reset selection** restores the default selections of one filter, for example a status filter that starts with Enabled and Suspended selected.
- **Reset filters** restores every filter of the page to its default.

Use the same behavior in the toolbar, in the dropdown and in the related empty state.

## Search

Add a search field when the list of options is long enough to make scanning hard. When nothing matches, show *No options*, keep the search field and *Clear selection* visible, and don't use an empty state inside the menu.

## Look and feel

The menu is wide enough for the option labels and their descriptions, starts at the left edge of the trigger and keeps a consistent minimum width. Don't force it to the width of a narrow trigger.

## Text

Filter labels are nouns, such as *Company*, not *Filter by company*: see [Table filters](?page=writing-guidelines#table-filters) in the writing guidelines. Options use the terms of the data, parallel in grammar and level of detail. Add a short description only to tell similar or unfamiliar options apart.
