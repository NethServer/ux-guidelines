# Text input

Text inputs collect short, single-line data that users type freely.

Code: `NeTextInput` · [Storybook](https://nethesis.github.io/vue-components/?path=/docs/components-netextinput--docs) · [Figma](https://www.figma.com/design/ZRZzzlqb9GfB9Xdz6iGufh/NDS?node-id=89-370)

## When to use

| When to use | When not to use |
| --- | --- |
| Short, structured information | Predefined values or categories: use a dropdown, radio buttons or checkboxes |
| Parameters that users configure by hand | Long text: use a text area |
| Filter fields: use the same component | |

## Anatomy

From top to bottom: the label (`text-sm font-medium`), with an optional tooltip and the *Optional* mark when the field is not required; the field, with an optional leading and trailing icon; the helper text (`text-sm`).

## States

Enabled, disabled, read only, focus and error.

- Use **read only** for prefilled information that users cannot change. Don't use *disabled* for this.
- In the **error** state, the message replaces the helper text and says what is wrong: "Only letters and numbers are allowed", not "Invalid input".

## Helper text

Helper text gives guidance and validation: keep it short, and use it to help users fill in the field, such as `IPv4 address or CIDR`. For longer information, use a [tooltip](?page=tooltip).

## Multiple values

When users add several structured values, such as the redirected ports of a rule, repeat the input and add a button such as *Add port* below the list.

## Text

Labels, helper text, placeholders and validation messages follow [Forms](?page=writing-guidelines#forms) in the writing guidelines.
