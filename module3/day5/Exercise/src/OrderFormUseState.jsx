import { useState } from "react";

// BEFORE (Day 3): three separate useState calls for one related form.
// Kept here only to compare with the useReducer version below;
// OrderForm.jsx (already in the app) is the one actually used.
const TELEBIRR_PATTERN = /^(?:\+251|0)9\d{8}$/;

function OrderFormUseState() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");

  const phoneValid = TELEBIRR_PATTERN.test(phone);
  const canSubmit = name.trim() !== "" && area.trim() !== "" && phoneValid;

  // Three fields means three setters to wire up, and any shared logic
  // (like "clear everything") has to call all three by hand:
  const reset = () => {
    setName("");
    setPhone("");
    setArea("");
  };

  return (
    <form
      className="order-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (canSubmit) reset();
      }}
    >
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
      <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="Area" />
      <button type="submit" disabled={!canSubmit}>
        Place order
      </button>
    </form>
  );
}

export default OrderFormUseState;
