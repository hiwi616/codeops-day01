import { useState } from "react";

// TeleBirr number: 09XXXXXXXX or +2519XXXXXXXX
// (accepts 0911223344 and +251911223344, rejects everything else)
const TELEBIRR_PATTERN = /^(?:\+251|0)9\d{8}$/;

const emptyForm = { name: "", phone: "", area: "" };

function OrderForm() {
  // One state object for every field, and one change handler.
  const [form, setForm] = useState(emptyForm);
  const [confirmation, setConfirmation] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Copy the object with the spread, then override one property.
    setForm((prev) => ({ ...prev, [name]: value }));
    setConfirmation("");
  };

  const phoneValid = TELEBIRR_PATTERN.test(form.phone);
  const showPhoneError = form.phone !== "" && !phoneValid;
  const canSubmit =
    form.name.trim() !== "" && form.area.trim() !== "" && phoneValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setConfirmation(
      `Thanks, ${form.name.trim()}! We will call ${form.phone} to confirm delivery to ${form.area.trim()}.`
    );
    setForm(emptyForm);
  };

  return (
    <form className="order-form" onSubmit={handleSubmit} noValidate>
      <h2>Delivery details</h2>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        autoComplete="name"
      />

      <label htmlFor="phone">TeleBirr number</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        value={form.phone}
        onChange={handleChange}
        placeholder="0911223344"
        aria-invalid={showPhoneError}
        aria-describedby="phone-hint"
        autoComplete="tel"
      />
      <p
        id="phone-hint"
        className={showPhoneError ? "hint hint-error" : "hint"}
      >
        {showPhoneError
          ? "Use 0911223344 or +251911223344 (no spaces)."
          : "Ethiopian mobile number, like 0911223344 or +251911223344."}
      </p>

      <label htmlFor="area">Area</label>
      <input
        id="area"
        name="area"
        type="text"
        value={form.area}
        onChange={handleChange}
        placeholder="e.g. Bole"
      />

      <button type="submit" className="submit-btn" disabled={!canSubmit}>
        Place order
      </button>

      {confirmation !== "" && <p className="confirm">{confirmation}</p>}
    </form>
  );
}

export default OrderForm;
