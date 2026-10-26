# Inline notification

Inline notifications show contextual messages next to the element or the process they refer to.

Code: `NeInlineNotification` · [Storybook](https://nethesis.github.io/vue-components/?path=/docs/components-neinlinenotification--docs) · [Figma](https://www.figma.com/design/ZRZzzlqb9GfB9Xdz6iGufh/NDS?node-id=95-2600)

## When to use

| When to use | When not to use |
| --- | --- |
| To warn about a required step in a process, such as a missing configuration | For global messages: use a [toast notification](?page=toast-notification) |
| To explain a restriction or a contextual rule, such as reserved IP ranges | |

## Anatomy

A rounded icon for the type, a title, an optional description, an optional close button and optional actions.

## Types

Each type has a fixed color and icon. Don't mix colors or replace the icon.

- **Information:** context users should know, with no immediate action, such as an expired session.
- **Success:** the completion of an action, shown where it happened.
- **Warning:** an important step to complete before going on, such as a backup passphrase to configure. Keep it visible until it is resolved.
- **Error:** a problem that prevents an action. Say clearly how to fix it.

## Behavior

Add the close button only to secondary or optional messages. Users must not be able to dismiss a mandatory requirement or important information.

## Actions

Inline notifications have their own buttons: never use the product buttons. With a single action, use the Secondary notification button.

## Text

Keep the title on one line and the description to one sentence: see [Inline notifications](?page=writing-guidelines#inline-notifications) in the writing guidelines.
