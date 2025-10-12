import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  isRequired = false,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  return (
    <div className="mb-4 w-100" style={{ maxWidth: "500px", margin: "0 auto" }}>
      <label htmlFor={name} className="form-label fw-semibold">
        {label} {isRequired && <span className="text-danger">*</span>}
      </label>
      <div className="input-group shadow-sm">
        <input
          id={name}
          name={name}
          type={isPasswordField && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form-control py-2 px-3 rounded shadow-none text-block-16 ${
            error ? "is-invalid border-danger" : "border-secondary"
          }`}
        />
        {isPasswordField && (
          <button
            type="button"
            className="btn btn-outline-secondary border-start-0"
            onClick={() => setShowPassword(!showPassword)}
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
}
