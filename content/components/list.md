# List

Lists show a collection of related resources that share the same structure, each in its own container.

Code: not in vue-components yet · [Figma](https://www.figma.com/design/ZRZzzlqb9GfB9Xdz6iGufh/NDS?node-id=259-3792)

## When to use

| When to use | When not to use |
| --- | --- |
| To show related items with the same structure, such as resources, rules or configuration objects | For dense data that needs column headers, sorting or comparison by column: use a table |
| When items have supporting information, a status or contextual actions | For standalone blocks with different structures: use cards |
| When users scan or manage several similar items | For simple navigation options |
| When the order of the items means priority or sequence | When each item contains a long or complex form |

## List or card

List items may look like separate cards, but they stay part of one ordered collection with the same layout and behavior. A card is standalone content that doesn't depend on the items around it.

## Content

- Identify each item with clear primary information, and add supporting information only when it helps tell items apart.
- Keep the same information in the same position in every item, and the actions at the end.
- Follow the [badge](?page=badge) rules for statuses and types.
- Truncate content only when needed, and show the full value in a tooltip.

## Reordering

- Allow reordering only when the order changes priority, sequence or behavior, such as firewall rules or trunk priorities.
- Show a drag handle at the start of each item, and start the drag from it.
- Keep the dragged item visible, show a drop indicator in the accent color of the product, and apply the new order when the item is released.
- Remove the drag handle when reordering is not available.

## Disabled items

Show a *Disabled* badge, reduce the emphasis without making the content unreadable, disable the actions that are not available and don't allow reordering.

## Look and feel

Use the same spacing between items, the same radius, surface and inner padding for all of them. Let the height grow when content wraps.
