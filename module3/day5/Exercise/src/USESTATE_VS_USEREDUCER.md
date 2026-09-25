# useState vs useReducer, side by side

`OrderFormUseState.jsx` and `OrderFormUseReducer.jsx` are two versions of the
same three-field form. Neither is imported into `App.jsx` — `OrderForm.jsx`
(the one already used) is unrelated; these two files are only for comparing
the two approaches, per Exercise 4.

## Differences noticed

- **State shape.** useState scatters the three fields into three independent
  variables. useReducer keeps them as one object, which matches how the
  fields are actually related (they're one form, submitted together).
- **Updating a field.** With useState, updating one field means calling one
  of three setters, and the input has to know which setter is "its"
  setter. With useReducer, every input calls the same `dispatch`, and the
  input's own `name` attribute tells the reducer which field to change —
  the JSX for each input becomes uniform.
- **Shared operations.** "Clear the form" is three calls (`setName("")`,
  `setPhone(""))`, `setArea("")`) with useState, done at every call site
  that needs it. With useReducer it's one action (`dispatch({ type: "reset" })`),
  and the logic for what "reset" means lives in one place, the reducer.
- **When useState is still fine.** For two or three unrelated pieces of
  state (a boolean toggle, a text filter), useState is simpler and needs no
  extra file. useReducer earns its keep when several values change
  together, or when the transitions between states matter (as with the
  cart below, where "add" behaves differently depending on whether the
  item already exists).
