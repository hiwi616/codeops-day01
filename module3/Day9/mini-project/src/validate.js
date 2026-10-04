// A pure function: same input always gives the same output, no state,
// no side effects. Called directly during render (not in an effect),
// so the errors it returns are always in sync with the current form -
// there's no extra render lag from useState/useEffect round-tripping.

const TELEBIRR_PATTERN = /^(?:\+251|0)9\d{8}$/;

export const AREAS = ["Bole", "Kazanchis", "Megenagna", "Piassa"];

// The order fields are checked in is also the order used to find the
// "first bad field" to focus after a blocked or failed submit.
export const FIELD_ORDER = ["name", "phone", "area"];

export function validate(form) {
  const errors = {};

  if (form.name.trim() === "") {
    errors.name = "Name is required.";
  }

  if (form.phone.trim() === "") {
    errors.phone = "Phone is required.";
  } else if (!TELEBIRR_PATTERN.test(form.phone.trim())) {
    errors.phone = "Enter a valid TeleBirr number, like 0911223344.";
  }

  if (form.area === "") {
    errors.area = "Choose a delivery area.";
  }

  // notes is optional - never produces an error.

  return errors;
}
