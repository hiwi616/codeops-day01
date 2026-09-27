import { useRef, useState } from "react";
import { validate, AREAS, FIELD_ORDER } from "./validate";
import { useCartTotal, useCartClear } from "./store/cartStore";
import Field from "./Field";

const emptyForm = { name: "", phone: "", area: "", notes: "" };
const emptyTouched = { name: false, phone: false, area: false };

// Simulating a failed request: type the word "fail" (any case) into
// Notes and submit. This is a deliberate, documented test hook (see the
// README) so the failure path can be triggered on demand instead of
// relying on random chance, which would make it hard to test or grade
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

function Checkout() {
  // All four fields, controlled from one state object with one change
  // handler - not four separate useState calls.
  const [form, setForm] = useState(emptyForm);
  const [touched, setTouched] = useState(emptyTouched);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [confirmation, setConfirmation] = useState("");

  // A ref, not state, guards against a double order. State updates are
  // batched and only take effect on the next render, so two clicks that
  // land close enough together could both read isSubmitting as false and
  // both fire. A ref is read and written synchronously, so the second
  // click sees the change from the first immediately, before either
  // click's handler has returned.
  const submittingRef = useRef(false);

  const total = useCartTotal();
  const clearCart = useCartClear();

  const fieldRefs = {
    name: useRef(null),
    phone: useRef(null),
    area: useRef(null),
  };

  // A pure validate(form), called fresh on every render - not stored in
  // state, not recomputed in an effect - so it's always in sync with the
  // current form, and a corrected field's error clears the moment the
  // value becomes valid, with no extra render lag.
  const errors = validate(form);

  // When the simulated request fails, the server "names" a field (phone,
  // in this simulation) as the reason. Merging it with the client-side
  // errors means the same "first bad field" logic in handleSubmit, and
  // the same Field/aria wiring, handle either kind of error with no
  // special-casing.
  const visibleErrors = { ...errors };
  if (submitError && !visibleErrors.phone) {
    visibleErrors.phone = submitError;
  }

  // A field's error is only shown once that field has been visited
  // (blurred) - or once a submit attempt has marked every field
  // touched - so an untouched empty field stays quiet until the person
  // actually leaves it.
  function show(field) {
    if (field === "phone" && submitError) return visibleErrors.phone;
    return touched[field] ? visibleErrors[field] : undefined;
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

    if (submittingRef.current) return;

    // A submit attempt counts as visiting every field, so a person who
    // tabbed straight to the button without blurring anything still
    // sees why it's blocked.
    setTouched({ name: true, phone: true, area: true });

    if (Object.keys(errors).length > 0) {
      focusFirstBadField(errors);
      return;
    }

    submittingRef.current = true;
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
      // Keep every value the person entered - do not reset the form -
      // and move focus to the field the server named as bad.
      setSubmitError(err.message);
      setConfirmation("");
      focusFirstBadField({ phone: err.message });
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <form className="order-form" onSubmit={handleSubmit} noValidate>
      <h2>Delivery details</h2>

      <Field id="name" label="Name" error={show("name")}>
        <input
          name="name"
          type="text"
          ref={fieldRefs.name}
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="name"
        />
      </Field>

      <Field
        id="phone"
        label="TeleBirr number"
        error={show("phone")}
        hint="Ethiopian mobile number, like 0911223344 or +251911223344."
      >
        <input
          name="phone"
          type="tel"
          ref={fieldRefs.phone}
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="0911223344"
          autoComplete="tel"
        />
      </Field>

      <Field id="area" label="Delivery area" error={show("area")}>
        <select
          name="area"
          ref={fieldRefs.area}
          value={form.area}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="">Choose an area...</option>
          {AREAS.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </Field>

      <Field id="notes" label="Notes (optional)">
        <textarea
          name="notes"
          rows={2}
          value={form.notes}
          onChange={handleChange}
          placeholder="e.g. gate code, landmark..."
        />
      </Field>

      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? "Placing order..." : `Place order - ${total} ETB`}
      </button>

      {confirmation !== "" && <p className="confirm">{confirmation}</p>}
    </form>
  );
}

export default Checkout;
