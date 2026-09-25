import { useReducer } from "react";
import { formReducer, initialFormState } from "./formReducer";

// AFTER: one useReducer replaces the three useState calls above.
// One state object, one dispatch, and "reset" is a single action
// instead of three separate setters called by hand.
const TELEBIRR_PATTERN = /^(?:\+251|0)9\d{8}$/;

function OrderFormUseReducer() {
  const [form, dispatch] = useReducer(formReducer, initialFormState);

  const handleChange = (e) => {
    dispatch({ type: "change", field: e.target.name, value: e.target.value });
  };

  const phoneValid = TELEBIRR_PATTERN.test(form.phone);
  const canSubmit = form.name.trim() !== "" && form.area.trim() !== "" && phoneValid;

  return (
    <form
      className="order-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (canSubmit) dispatch({ type: "reset" });
      }}
    >
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
      <input name="area" value={form.area} onChange={handleChange} placeholder="Area" />
      <button type="submit" disabled={!canSubmit}>
        Place order
      </button>
    </form>
  );
}

export default OrderFormUseReducer;
