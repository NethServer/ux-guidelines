# Checkbox

Checkboxes let users select one or more options, or turn a single option on.

Code: `NeCheckbox` · [Storybook](https://nethesis.github.io/vue-components/?path=/docs/components-necheckbox--docs) · [Figma](https://www.figma.com/design/ZRZzzlqb9GfB9Xdz6iGufh/NDS?node-id=103-1053)

## When to use

| When to use | When not to use |
| --- | --- |
| When users can choose more than one option | When users can choose only one option: use radio buttons or a toggle |
| To show all the options at once | When the choice triggers an action immediately |

With fewer than six options, use checkboxes. With more options, or when the list needs to be searchable, use a [combobox](?page=combobox).

## Anatomy

An optional title, the checkbox, its label and an optional description.

## States

Unselected, the default, and selected, shown in the primary color of the product, plus focus.

## Errors

When a required checkbox is not selected, show the error message below it, such as *You need to agree to the terms and conditions*.

## Text

Keep labels short but informative, with no final punctuation.
