import { useRef, useState } from "react";
import { validate, AREAS, FIELD_ORDER } from "./validateCheckout";
import { useCartTotal, useCartClear } from "./store/cartStore";

const emptyForm = { name: "", phone: "", area: "", notes: "" };
const emptyTouched = { name: false, phone: false, area: false };

// Simulating a failed request: type the word "fail" (any case) into
// Notes and submit. This is a deliberate, documented test hook (see the
// README) so the failure path can be triggered on demand instead of
// relying on random chance, which would make this hard to test or grade
// reliably. A real checkout would instead see this branch triggered by
// an actual failed fetch/response.
function simulateSubmit(form) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (form.notes.trim().toLowerCase() === "fail") {
        reject(
          new Error(
            "We couldn't verify that TeleBirr number with the network. Please check it and try again."
          )
        );
      } else {
        resolve();
      }
    }, 600);
  });
}

function CheckoutForm() {
  // Exercise 1: one state object for the whole form.
  const [form, setForm] = useState(emptyForm);
  // Exercise 4: which fields have been visited (blurred), so their
  // errors are only shown once the person has actually left that field.
  const [touched, setTouched] = useState(emptyTouched);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [confirmation, setConfirmation] = useState("");

  const total = useCartTotal();
  const clearCart = useCartClear();

  const fieldRefs = {
    name: useRef(null),
    phone: useRef(null),
    area: useRef(null),
  };

  // Exercise 3: validate(form) is a pure function, called fresh on every
  // render - not stored in state, not recomputed in an effect.
  const errors = validate(form);

  // Exercise 7: when the simulated request fails, the server "names" a
  // field (phone, in this simulation) as the reason. Merging it with the
  // client-side errors means the same "first bad field" logic in
  // handleSubmit and the same aria-invalid/error-message rendering below
  // both work for either kind of error, with no special-casing.
  const visibleErrors = { ...errors };
  if (submitError && !visibleErrors.phone) {
    visibleErrors.phone = submitError;
  }

  function focusFirstBadField(errorSet) {
    const firstBadField = FIELD_ORDER.find((field) => errorSet[field]);
    if (firstBadField) {
      fieldRefs[firstBadField].current?.focus();
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // A field that already has a request error gets a clean slate as
    // soon as the person starts fixing it.
    if (name === "phone" && submitError) setSubmitError(null);
  }

  function handleBlur(e) {
    const { name } = e.target;
    if (name in touched) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Treat a submit attempt as "visiting" every field, so a person who
    // never blurred a field (e.g. tabbed straight to the button) still
    // sees why the form won't go through.
    setTouched({ name: true, phone: true, area: true });

    if (Object.keys(errors).length > 0) {
      focusFirstBadField(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await simulateSubmit(form);
      setConfirmation(
        `Thanks, ${form.name.trim()}! Your order is on its way to ${form.area}.`
      );
      clearCart();
      setForm(emptyForm);
      setTouched(emptyTouched);
    } catch (err) {
      // Exercise 7: keep every value the person entered - do not reset
      // the form - and move focus to the field the server named as bad.
      setSubmitError(err.message);
      setConfirmation("");
      focusFirstBadField({ phone: err.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="order-form" onSubmit={handleSubmit} noValidate>
      <h2>Delivery details</h2>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        ref={fieldRefs.name}
        value={form.name}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="name"
        aria-invalid={Boolean(visibleErrors.name && touched.name)}
        aria-describedby={
          visibleErrors.name && touched.name ? "name-error" : undefined
        }
      />
      {visibleErrors.name && touched.name && (
        <p id="name-error" className="field-error" role="alert">
          {visibleErrors.name}
        </p>
      )}

      <label htmlFor="phone">TeleBirr number</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        ref={fieldRefs.phone}
        value={form.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="0911223344"
        autoComplete="tel"
        aria-invalid={Boolean(visibleErrors.phone && (touched.phone || submitError))}
        aria-describedby={
          visibleErrors.phone && (touched.phone || submitError)
            ? "phone-error"
            : "phone-hint"
        }
      />
      {visibleErrors.phone && (touched.phone || submitError) ? (
        <p id="phone-error" className="field-error" role="alert">
          {visibleErrors.phone}
        </p>
      ) : (
        <p id="phone-hint" className="hint">
          Ethiopian mobile number, like 0911223344 or +251911223344.
        </p>
      )}

      <label htmlFor="area">Delivery area</label>
      <select
        id="area"
        name="area"
        ref={fieldRefs.area}
        value={form.area}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={Boolean(visibleErrors.area && touched.area)}
        aria-describedby={
          visibleErrors.area && touched.area ? "area-error" : undefined
        }
      >
        <option value="">Choose an area...</option>
        {AREAS.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </select>
      {visibleErrors.area && touched.area && (
        <p id="area-error" className="field-error" role="alert">
          {visibleErrors.area}
        </p>
      )}

      <label htmlFor="notes">Notes (optional)</label>
      <textarea
        id="notes"
        name="notes"
        rows={2}
        value={form.notes}
        onChange={handleChange}
        placeholder="e.g. gate code, landmark..."
      />

      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? "Placing order..." : `Place order - ${total} ETB`}
      </button>

      {confirmation !== "" && <p className="confirm">{confirmation}</p>}
    </form>
  );
}

export default CheckoutForm;
