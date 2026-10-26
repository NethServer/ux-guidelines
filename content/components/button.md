# Button

Buttons trigger actions or submit what users entered. Their look follows the visual identity of each product.

Code: `NeButton` · [Storybook](https://nethesis.github.io/vue-components/?path=/docs/components-nebutton--docs) · [Figma](https://www.figma.com/design/ZRZzzlqb9GfB9Xdz6iGufh/NDS?node-id=29-8207)

## Kinds

| When to use | When not to use |
| --- | --- |
| **Primary** for the main action of a view or dialog, such as Save, Create or Install | Two Primary buttons side by side |
| **Secondary** for complementary or less prominent actions, such as Refresh or Preview | Danger for actions that are not destructive |
| **Tertiary** for minor, contextual or dismissive actions, such as Cancel | Removing the label just to save space: use an icon button only for familiar actions |
| **Danger** only for destructive actions or actions with serious consequences, such as Delete | An icon-only button when the icon alone does not make the action clear |
| **AI** (pink to indigo) for actions that invoke AI | |

In modals and drawers, pair Tertiary and Primary: Cancel and Save, Cancel and Create. Don't combine levels of the hierarchy without a clear reason.

## Anatomy and sizes

A button has a label and, optionally, a leading or a trailing icon.

| Size | Text | Icon | Use |
| --- | --- | --- | --- |
| Small | `text-xs font-medium` | 12 px | Specific uses |
| Large | `text-sm font-medium` | 16 px | Default |
| Extra large | `text-base font-medium` | 16 px | Website, for better legibility |

## Behavior

- States: default, hover, focus, disabled and loading.
- A disabled button has 50% opacity and does not react.
- A loading button replaces its icon with a spinner.
- Primary and Secondary buttons can have a trailing arrow that opens a menu.

## Text

Labels start with a verb, are one to three words long and use sentence case: see [Buttons and actions](?page=writing-guidelines#buttons-and-actions) in the writing guidelines.
