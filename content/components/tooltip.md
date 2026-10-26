# Tooltip

Tooltips add context or information when users hover over an element or tap it.

Code: `NeTooltip` · [Storybook](https://nethesis.github.io/vue-components/?path=/docs/components-netooltip--docs) · [Figma](https://www.figma.com/design/ZRZzzlqb9GfB9Xdz6iGufh/NDS?node-id=207-2015)

## When to use

| When to use | When not to use |
| --- | --- |
| To explain an element that is not self-explanatory, such as an icon or a label | For information users need to complete a task: show it in the interface |
| For extra information that improves the experience, when the interface is clear without it | |
| To guide users through complex or less common actions without cluttering the interface | |

Use tooltips only when needed, and keep them short: only the information that helps users understand.

## Tooltip or helper text

- A **tooltip** is temporary and disappears when users move away. Use it when the information is supplementary and doesn't need to be always visible.
- **Helper text** stays visible below a [text input](?page=text-input). Use it for instructions or examples users need while typing, such as a format or a limit.

## Uses

- **On an info icon**, next to a label, such as the explanation of *Public endpoints*.
- **On an interface element**, such as a truncated value or an [icon button](?page=icon-button).
- A tooltip can contain a link, such as *Go to subscription*.
