import { cloneElement } from "react";

// Wraps one form control with its label, and wires aria-invalid /
// aria-describedby onto it automatically, so that logic exists in one
// place instead of being repeated for every field. Pass the actual
// <input>/<select>/<textarea> as children, already carrying its own
// name, value, onChange, onBlur (and ref, if it needs one) - Field only
// adds the id, the ARIA attributes, and renders the label plus whichever
// of the error or hint text applies.
function Field({ id, label, error, hint, children }) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  const control = cloneElement(children, {
    id,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy,
  });

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {control}
      {error ? (
        // The "!! " prefix is a plain-text warning marker, not an image -
        // so the field that's wrong is still identifiable with color
        // vision turned off (e.g. a greyscale display), not just by a
        // red border.
        <p id={`${id}-error`} className="field-error" role="alert">
          {"\u26A0 "}
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export default Field;
