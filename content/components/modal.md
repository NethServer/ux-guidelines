# Modal

Modals hold focused tasks, decisions or information that interrupt the current flow for a moment.

Code: `NeModal` · [Storybook](https://nethesis.github.io/vue-components/?path=/docs/components-nemodal--docs) · [Figma](https://www.figma.com/design/ZRZzzlqb9GfB9Xdz6iGufh/NDS?node-id=169-7947)

## When to use

| When to use | When not to use |
| --- | --- |
| To ask users to confirm a decision | For passive confirmation that an action was completed: use a [toast notification](?page=toast-notification) |
| To confirm destructive, irreversible or high-impact actions | For temporary or recoverable feedback within a page: use an [inline notification](?page=inline-notification) |
| To complete a short, focused task without leaving the page | When users don't need to decide, acknowledge or complete anything |
| To show information that needs immediate attention or acknowledgement | For long or complex forms: use a page or a side drawer |
| To collect a little input needed to continue an action | For content users may need to compare with the page behind |

Include only the information and the actions needed to complete or dismiss the task.

## Anatomy

A modal has, from top to bottom: an optional rounded icon, the title, the description, the close button and the actions (Cancel and the main action).

Use the rounded icon only when it says something about the nature of the message:

- **Information:** neutral guidance or context.
- **Success:** a completed result that needs acknowledging.
- **Warning:** a risk or a consequence before continuing.
- **Error:** a failed or blocked operation.

The type of the message is shown by the icon; the consequence of the action is shown by the button style.

## Actions

- **Two actions:** Cancel on the left, the main action on the right, following the [button](?page=button) hierarchy.
- **Three actions:** only when users choose between two meaningful outcomes or cancel, as in *Unsaved changes*: Cancel, Don't save, Save. Keep Cancel on the left, apart from the task actions, and put the alternative action before the main one.
- **One action:** when users only acknowledge or dismiss information. Use Close, aligned to the right, and no Cancel.

## Destructive actions

- Use a Danger button for destructive, irreversible or high-impact operations. Don't use Danger for other actions, and don't use the Error type only because the action is destructive.
- Say what will be affected and whether the action can be undone.
- For high-impact actions, such as a factory reset, ask users to type a value to confirm: show the exact value and keep the main action disabled until it matches. Don't do this for routine deletions.

## Other uses

- **Radio selection:** a modal can ask users to choose an option before acting, such as the format of a configuration to download.

## Text

Title, description and buttons follow [Modals](?page=writing-guidelines#modals) in the writing guidelines.
