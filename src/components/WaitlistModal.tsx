import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Status = "idle" | "submitting" | "success" | "updated" | "error";

const EMPTY = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  referral: "",
  city: "",
  state: "",
  numProperties: "",
};

type Field = keyof typeof EMPTY;

// US states + DC, for the State dropdown.
const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID",
  "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO",
  "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA",
  "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns an error string for a field, or "" if it's valid.
function validate(field: Field, value: string): string {
  const v = value.trim();
  switch (field) {
    case "firstName":
    case "lastName":
    case "city":
      return v ? "" : "Required";
    case "email":
      if (!v) return "Required";
      return EMAIL_RE.test(v) ? "" : "Enter a valid email address";
    case "state":
      return v ? "" : "Select a state";
    case "numProperties":
      if (!v) return "Required";
      return Number(v) >= 0 ? "" : "Enter a valid number";
    case "phone": {
      // Optional — only validate when something was entered.
      if (!v) return "";
      const digits = v.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 15
        ? ""
        : "Enter a valid phone number";
    }
    default:
      return "";
  }
}

export default function WaitlistModal({ open, onClose }: Props) {
  const [form, setForm] = useState(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Close on Escape and lock body scroll while the modal is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const update =
    (field: Field) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const markTouched = (field: Field) => () =>
    setTouched((t) => ({ ...t, [field]: true }));

  // Show an error for a field only once the user has left it ("clicked off").
  const errorFor = (field: Field) =>
    touched[field] ? validate(field, form[field]) : "";

  const inputClass = (field: Field) =>
    errorFor(field) ? "invalid" : undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate everything; if anything is invalid, reveal all errors and stop.
    const fields = Object.keys(EMPTY) as Field[];
    const hasErrors = fields.some((f) => validate(f, form[f]) !== "");
    if (hasErrors) {
      setTouched(Object.fromEntries(fields.map((f) => [f, true])));
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    // Writes go through the join_waitlist RPC (a SECURITY DEFINER function), so
    // a re-submit with an existing email updates that entry instead of failing.
    // It returns 'inserted' on first signup or 'updated' on a re-submit. Only
    // the insert path fires the confirmation-email webhook.
    const { data, error } = await supabase.rpc("join_waitlist", {
      p_first_name: form.firstName.trim(),
      p_last_name: form.lastName.trim(),
      p_email: form.email.trim().toLowerCase(),
      p_phone: form.phone.trim() || null,
      p_referral: form.referral.trim() || null,
      p_city: form.city.trim(),
      p_state: form.state,
      p_num_properties: Number(form.numProperties),
    });

    if (error) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email founders@atlia.com.");
      return;
    }

    setStatus(data === "updated" ? "updated" : "success");
  };

  return (
    <div className="waitlist-overlay" onClick={onClose}>
      <div
        className="waitlist-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Join the waitlist"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="waitlist-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        {status === "success" ? (
          <div className="waitlist-success">
            <h2>You're on the list ✦</h2>
            <p>
              Thanks for joining the Atlia waitlist. We'll be in touch soon at{" "}
              <strong>{form.email || "your email"}</strong>.
            </p>
            <button className="waitlist-submit" onClick={onClose}>
              Done
            </button>
          </div>
        ) : status === "updated" ? (
          <div className="waitlist-success">
            <h2>Details updated ✦</h2>
            <p>
              <strong>{form.email || "This email"}</strong> was already on the
              list, so we've updated your details. You're all set — we'll be in
              touch soon.
            </p>
            <button className="waitlist-submit" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
            <h2>Join the waitlist</h2>
            <p className="waitlist-sub">
              Tell us a bit about you and your properties.
            </p>

            <div className="waitlist-row">
              <label>
                First name
                <input
                  value={form.firstName}
                  onChange={update("firstName")}
                  onBlur={markTouched("firstName")}
                  className={inputClass("firstName")}
                  autoComplete="given-name"
                />
                {errorFor("firstName") && (
                  <span className="waitlist-field-error">{errorFor("firstName")}</span>
                )}
              </label>
              <label>
                Last name
                <input
                  value={form.lastName}
                  onChange={update("lastName")}
                  onBlur={markTouched("lastName")}
                  className={inputClass("lastName")}
                  autoComplete="family-name"
                />
                {errorFor("lastName") && (
                  <span className="waitlist-field-error">{errorFor("lastName")}</span>
                )}
              </label>
            </div>

            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={update("email")}
                onBlur={markTouched("email")}
                className={inputClass("email")}
                autoComplete="email"
              />
              {errorFor("email") && (
                <span className="waitlist-field-error">{errorFor("email")}</span>
              )}
            </label>

            <div className="waitlist-row">
              <label>
                Phone <span className="waitlist-optional">(optional)</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  onBlur={markTouched("phone")}
                  className={inputClass("phone")}
                  autoComplete="tel"
                  placeholder="(555) 123-4567"
                />
                {errorFor("phone") && (
                  <span className="waitlist-field-error">{errorFor("phone")}</span>
                )}
              </label>

              <label>
                Referral <span className="waitlist-optional">(optional)</span>
                <input
                  value={form.referral}
                  onChange={update("referral")}
                  placeholder="Referral name or code."
                />
              </label>
            </div>

            <div className="waitlist-row">
              <label>
                City
                <input
                  value={form.city}
                  onChange={update("city")}
                  onBlur={markTouched("city")}
                  className={inputClass("city")}
                  autoComplete="address-level2"
                />
                {errorFor("city") && (
                  <span className="waitlist-field-error">{errorFor("city")}</span>
                )}
              </label>
              <label>
                State
                <select
                  value={form.state}
                  onChange={update("state")}
                  onBlur={markTouched("state")}
                  className={inputClass("state")}
                  autoComplete="address-level1"
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errorFor("state") && (
                  <span className="waitlist-field-error">{errorFor("state")}</span>
                )}
              </label>
            </div>

            <label>
              Number of properties
              <input
                type="number"
                min="0"
                step="1"
                value={form.numProperties}
                onChange={update("numProperties")}
                onBlur={markTouched("numProperties")}
                className={inputClass("numProperties")}
              />
              {errorFor("numProperties") && (
                <span className="waitlist-field-error">{errorFor("numProperties")}</span>
              )}
            </label>

            {status === "error" && (
              <p className="waitlist-error">{errorMsg}</p>
            )}

            <button
              className="waitlist-submit"
              type="submit"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Joining…" : "Join the waitlist"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
