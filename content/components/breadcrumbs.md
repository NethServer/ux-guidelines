# Breadcrumbs

Breadcrumbs show where the current page is in a hierarchy of several levels.

Code: not in vue-components yet · [Figma](https://www.figma.com/design/ZRZzzlqb9GfB9Xdz6iGufh/NDS?node-id=3634-5204)

## When to use

| When to use | When not to use |
| --- | --- |
| When users need to go back to a parent or an intermediate level | For pages with a single level |
| When the same page can be reached from different paths and users need to see where they are | When the side navigation already shows the same hierarchy |

Keep the trail short, with only the pages needed to understand where users are.

## Structure

- The first item is always the root level; the last item is the current page.
- Every item except the current page is a link. The current page is not interactive.
- Separate the items with the Font Awesome `angle-right` icon, 16 px, colored with the tertiary neutral icon token.
- When the trail doesn't fit, collapse the middle items into a single "…" item that opens a menu with the hidden levels. Keep the root and the last two items visible.
- Don't use loading or disabled states on the items.

## Look and feel

- **Links:** `text-xs font-medium`, in the primary color of the product. On hover and on focus, they shift tone like the other primary elements.
- **Current page:** `text-xs`, regular weight, in tertiary neutral text. Don't make it bold.

## Text

- Use the exact title of each page, as in the navigation and in the page heading, in sentence case and with no punctuation.
- Don't shorten a label to save space: collapse whole items instead.
