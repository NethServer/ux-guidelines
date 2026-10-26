# Empty state

An empty state explains why a page or section has no content, and guides users to the next step when there is one.

Code: `NeEmptyState` · [Storybook](https://nethesis.github.io/vue-components/?path=/docs/components-neemptystate--docs) · [Figma](https://www.figma.com/design/ZRZzzlqb9GfB9Xdz6iGufh/NDS?node-id=184-12768)

## When to use

| When to use | When not to use |
| --- | --- |
| When no items exist and no action is required | For temporary or recoverable errors within existing content: use an [inline notification](?page=inline-notification) |
| When nothing is configured yet and users can create the first item | When a short message can be shown inside the related component |
| When a search or a filter returns no results | When content is hidden only because users have not opened or expanded it |
| When users cannot access the content | While the content is loading: use a skeleton |
| When a feature is disabled or unavailable | |
| When the current system conditions produce no data | |

Use an empty state for page-level restrictions or unavailable content, and an inline notification for temporary or recoverable errors in a page that is otherwise available.

## Cases

| Case | Example | Action |
| --- | --- | --- |
| Configuration required | No forward rules configured | Primary action for the main setup task: *Add forward rule* |
| No results | No calls found | Optional Tertiary action that restores the default filters: *Reset filters* |
| Restricted page | Restricted page | A safe destination, when there is one: *Go to Dashboard* |
| Feature disabled | Threat Shield DNS is disabled | Primary action only when there is a clear next step: *Go to FlashStart DNS* |
| Automated system status | No banned IPs | None |
| Process in progress | Configuring users | None: users wait for the system, in a guided flow |

## Icon

- Use the icon of the section when it represents the empty content clearly. Use an icon of the state when it explains the reason better, such as a magnifying glass for search results or a ban icon for restricted content.
- On desktop, the icon is 48 px. On mobile, and always in NethLink, it is 32 px.

## Actions

- Add an action only when users can or should act.
- With two actions, stack them: the Primary action first, the Tertiary action below. Never use more than two.

## Text

Title, description and action follow [Empty states](?page=writing-guidelines#empty-states) in the writing guidelines.
