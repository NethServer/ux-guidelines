# Badge

Badges show a short status, category or piece of context.

Code: `NeBadgeV2` · [Storybook](https://nethesis.github.io/vue-components/?path=/docs/components-nebadgev2--docs) · [Figma](https://www.figma.com/design/ZRZzzlqb9GfB9Xdz6iGufh/NDS?node-id=86-1177)

## When to use

| When to use | When not to use |
| --- | --- |
| To show a status, such as Enabled, Disabled, Blocked or Modified | For actions or navigation |
| To show a category, a role or a type, such as Queue, Admin or Customer care | For long explanations or full sentences |
| To show compact metadata that helps users scan content | When the surrounding content already makes the information clear |

Keep the meaning and the terms of each badge the same across products.

## Anatomy and sizes

A label with an optional leading or trailing icon, in two sizes: extra small (`text-xs font-medium`) and small (`text-sm font-medium`).

## Variants

- **Rounded:** for statuses, categories and compact metadata.
- **Squared:** for selected values that users can remove, such as the values of a combobox.

Choose the variant from the content, not from visual preference.

## Color

- Use the same color for the same meaning in every product: green for Enabled, gray for Disabled, rose for Blocked.
- Use status colors (success, warning, danger, information) only when the meaning matches. Use neutral colors for categories with no status.
- Always pair the color with a clear label: color must never be the only way to convey the meaning.

## Icons

- Use an icon only when it reinforces the label, never in place of it.
- Keep the icon in the same position for the same kind of badge.
- Use a trailing icon only for an interaction, such as removing a selected value, and make it look different from decorative icons.

## Text

- One or two words, in sentence case, with no punctuation and no uncommon abbreviations.
- **Statuses** use adjectives or past participles: Enabled, Disabled, Blocked, Pending. Don't use actions (Enable, Block) or vague words (OK, Normal, Status).
- **Categories** use nouns, parallel in grammar and level of detail, with the terms already used by the feature: Admin, Queue, Customer care.
