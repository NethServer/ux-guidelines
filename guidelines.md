# Writing guidelines

Rules for the text of every Nethesis user interface. Use them together with the glossary. Where a rule comes from a [vue-components pattern](https://nethesis.github.io/vue-components/), use that pattern instead of rebuilding it.

## Voice and tone

Be clear, direct and calm. Say what happened and what the user can do. Don't blame the user, don't joke, and avoid jargon when a plain word exists.

| Do | Don't |
| --- | --- |
| Cannot connect to the leader node | Oops! Something bad happened |
| You don't have permission to view this page | Access denied: insufficient privileges |

## Capitalization

Use sentence case everywhere: page titles, buttons, labels, menu items, table headers. Capitalize only the first word and proper nouns (product names, protocols, acronyms).

| Do | Don't |
| --- | --- |
| Change password | Change Password |
| Worker node | Worker Node |

When a sentence names a specific page, menu item or tab, write it exactly as it appears in the user interface. When the same word is used as a common noun, write it in lowercase.

| Do | Don't |
| --- | --- |
| Go to Dashboard | Go to dashboard |
| The dashboard shows the cluster status | The Dashboard shows the cluster status |

## Punctuation

- End full sentences with a period in descriptions and body text.
- Don't use a period in titles, labels, buttons, placeholders, table cells and toast notifications.
- Use the ellipsis character `…`, not three dots. Use it only for text that is in progress (`Loading…`).
- Use straight quotes around names the user must type: `Type 'Alice Fox' to confirm`.

## Buttons and actions

Start with a verb and name the object when the context is not obvious. The confirmation button repeats the action.

| Do | Don't |
| --- | --- |
| Create user | New, OK, Yes |
| Delete | Confirm |

Use the glossary verbs: **Create** a new object, **Add** an existing one, **Edit**, **Delete** to destroy, **Remove** from a list, **Uninstall** an application.

For links and buttons that take the user somewhere else:

- **Go to** `<page>` navigates to another page of the same product: `Go to Dashboard`, `Go to Settings`.
- **Open** `<site>` opens an external website in a new tab: `Open Weblate`.

| Do | Don't |
| --- | --- |
| Go to Settings | Open Settings |
| Open Weblate | Go to Weblate |

## Page header

From the *Table page* pattern.

- Title: the plural object (`Phonebook contacts`).
- Description: one sentence, `List of <objects>, including <main attributes>.`
- Primary action on the right: `Create <object>`.
- Text filter placeholder: `Filter <objects>`.

## Table filters

From the *Table page* pattern and My Nethesis. A table can have a text filter and some dropdown
filters. A filter can have a default value: for example, a status filter that shows only the
active users when the page opens.

- **Reset** brings filters back to their default values. Use it in every case except the one
  below, even when all the defaults are empty.
- **Clear** empties a selection. Use it only inside a single dropdown filter that has nothing
  selected by default: there, resetting means emptying, and "Clear" says it better.

| Action | Label | Italian |
| --- | --- | --- |
| All the filters of a table, from the toolbar or the empty state | Reset filters | Reimposta filtri |
| One dropdown filter that has a default selection | Reset selection | Reimposta selezione |
| One dropdown filter that has nothing selected by default | Clear selection | Azzera selezione |
| The clear button of the text filter (screen readers only) | Clear search | Azzera ricerca |

| Do | Don't |
| --- | --- |
| Reset filters | Clear filters |
| Reset selection, for a status filter with a default | Clear selection |

## Empty states

From the *Empty state* pattern. Pick the case that matches the situation.

| Case | Title | Description | Action |
| --- | --- | --- | --- |
| Nothing created yet | No users configured | none | Create user |
| Nothing to show, nothing to create | No voicemail messages | You currently have no voicemail messages. | none |
| Filters match nothing | No users found | Try changing your search filters | Reset filters |
| No permission | Restricted page | It seems that you don't have the necessary permissions to view this page. | Go to Dashboard |

## Delete confirmation

From the *Delete item modal* pattern.

- Title: `Delete <object type>`.
- Body: name the object and say what happens: `User Alice Fox will be permanently deleted.` Add the side effects: `Their personal files will be deleted too.`
- Buttons: `Delete` (danger) and `Cancel`.
- When deletion destroys data or many objects, ask the user to type the name: `Type 'Alice Fox' to confirm`.

## Error messages

From the *Inline error notification* pattern.

- Title: `Cannot <verb> <object>`, for example `Cannot save phonebook contact`.
- Description: the cause and what to do: `Network error. Check your connection and reload the page.`
- Use `Something went wrong` only when the cause is really unknown.

## Success notifications

From the *Success toast notification* pattern.

- Title: `<Object> created`, `<Object> updated`, `<Object> deleted`.
- Description: `<Object type> <name> has been created`.
- Don't show a toast for actions whose result is already visible on the page.

## Forms

From the *New password form* pattern.

- Labels are nouns: `New password`, `Confirm new password`.
- Validation messages say how to fix the value: `Choose a password that meets all requirements`, `Passwords do not match`.
- Mark optional fields, not required ones. When a required field is empty, say `Required`.

## Numbers, dates and units

- Format numbers and dates for the user's language.
- Put a space between a number and its unit: `10 GB`, `30 s`.
- Use the 24-hour clock in Italian.

## Italian translation

- Use the informal imperative (*tu*): `Inserisci`, `Seleziona`, `Controlla`. Don't use the infinitive (`Inserire`) or the formal form (`Inserisca`).
- Keep the English capitalization: sentence case. Write the name of a page, menu item or tab exactly as its Italian label: `Vai alla Dashboard`, `Vai alle Impostazioni`. Translate **Go to** as *Vai a* and **Open** as *Apri*.
- Don't translate the terms marked *Keep in English* in the glossary. Translate everything else, including `Download` (`Scarica`) and `Upload` (`Carica`).
- Patterns to reuse:

| English | Italian |
| --- | --- |
| Cannot save phonebook contact | Impossibile salvare il contatto della rubrica |
| User created | Utente creato |
| User Alice Fox has been created | L'utente Alice Fox è stato creato |
| User Alice Fox will be deleted. | L'utente Alice Fox verrà eliminato. |
| Type 'Alice Fox' to confirm | Digita 'Alice Fox' per confermare |
| No users found | Nessun utente trovato |
| Try changing your search filters | Prova a modificare i filtri di ricerca |
| Go to Dashboard | Vai alla Dashboard |
| Open Weblate | Apri Weblate |
| Cancel | Annulla |
