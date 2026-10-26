# Icon button

Icon buttons are compact buttons for contextual actions that a familiar, unambiguous icon represents.

Code: `NeButton` with only an icon · [Storybook](https://nethesis.github.io/vue-components/?path=/docs/components-nebutton--docs) · [Figma](https://www.figma.com/design/ZRZzzlqb9GfB9Xdz6iGufh/NDS?node-id=29-8207)

## When to use

| When to use | When not to use |
| --- | --- |
| Compact actions in toolbars, tables, lists or cards | Complex or unfamiliar actions, or actions that need explaining |
| Contextual actions repeated on many items, where text would add clutter | When clarity matters more than space: use a button with text, with or without an icon |
| Familiar global actions, such as closing a dialog | Destructive actions performed immediately, without confirmation |

## Behavior

- Every icon button has a tooltip, shown on hover and on keyboard focus, and an accessible name with the same text.
- A disabled icon button has 50% opacity and does nothing. Its tooltip can explain why the action is not available.
- Icon buttons use the Primary, Secondary and Tertiary kinds. There is no Danger kind: destructive actions use Tertiary and ask for confirmation before they run.
- The icon is 16 px and the button is 36 px.

## Text

The tooltip describes the action, not the icon: see the icon button rules in [Buttons and actions](?page=writing-guidelines#buttons-and-actions).

| Do | Don't |
| --- | --- |
| Delete user | Trash |
| Edit contact | Pencil |
| Copy phone number | Click here |
