import { useState } from "react";

// Ethiopian mobile number: 09XXXXXXXX, 07XXXXXXXX, or +2519XXXXXXXX / +2517XXXXXXXX
const TELEBIRR_PATTERN = /^(?:\+251|0)[79]\d{8}$/;

const emptyForm = { name: "", phone: "", area: "" };

function isValidTelebirr(value) {
  return TELEBIRR_PATTERN.test(value.replace(/[\s-]/g, ""));
}

function DeliveryForm() {
  // One state object for all fields, and one change handler.
  const [form, setForm] = useState(emptyForm);
  const [confirmation, setConfirmation] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setConfirmation("");
  };

  const phoneValid = isValidTelebirr(form.phone);
  const showPhoneError = form.phone !== "" && !phoneValid;
  const canSubmit =
    form.name.trim() !== "" && form.area.trim() !== "" && phoneValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setConfirmation(
      `Thanks, ${form.name.trim()}! We will call ${form.phone.trim()} to confirm delivery to ${form.area.trim()}.`
    );
    setForm(emptyForm);
  };

  return (
    <form className="delivery" onSubmit={handleSubmit} noValidate>
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
        placeholder="0911 234 567"
        aria-invalid={showPhoneError}
        aria-describedby="phone-hint"
        autoComplete="tel"
      />
      <p
        id="phone-hint"
        className={showPhoneError ? "hint hint-error" : "hint"}
      >
        {showPhoneError
          ? "Enter a valid number, like 0911234567 or +251911234567."
          : "Ethiopian mobile number, starting with 09 or 07."}
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

export default DeliveryForm;
