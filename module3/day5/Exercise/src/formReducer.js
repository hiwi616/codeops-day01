export const initialFormState = { name: "", phone: "", area: "" };

// One action type handles every field: the input's `name` attribute
// tells the reducer which key to update.
export function formReducer(state, action) {
  switch (action.type) {
    case "change":
      return { ...state, [action.field]: action.value };
    case "reset":
      return initialFormState;
    default:
      return state;
  }
}
