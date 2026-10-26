# Toast notification

Toasts give quick feedback on an action and disappear by themselves after a short time.

Code: `NeToastNotificationV2` · [Storybook](https://nethesis.github.io/vue-components/?path=/docs/components-netoastnotificationv2--docs) · [Figma](https://www.figma.com/design/ZRZzzlqb9GfB9Xdz6iGufh/NDS?node-id=185-14607)

## When to use

| When to use | When not to use |
| --- | --- |
| When an action is applied immediately, to confirm it without interrupting users | When changes are not applied immediately, such as in NethSecurity, where users must apply the changes |
| | When the information must stay visible |

## Anatomy

A toast has a status icon (rounded icon, 40 px), a title (`text-lg font-medium`), a description (`text-sm`), the close button and up to two actions.

## Types

Each type has its own status icon. Always use the default icon of the type: don't change it to match the content (a user, a system, a rule), and don't change its color.

- **Information:** neutral updates or system messages.
- **Success:** completed actions.
- **Warning:** issues that don't block users, or that need attention.
- **Error:** failed actions or blocking problems.

## Actions

Most toasts have no actions. Add them only when users need to respond or follow up, and only when they add clear value:

- at most two actions;
- the main action uses a Secondary button and must be specific, such as *Configure 2FA*;
- the other action uses a Tertiary button, such as *Don't ask again*.

## Text

Title and description follow [Success notifications](?page=writing-guidelines#success-notifications) in the writing guidelines: a short title in the past tense, and a description that names the object.
