export default function SubmitButton({
  type = "button",
  onClick,
  children,
  submitBtnDisabled = false,
  submitLoading = false,
}) {
  const buttonStyle = {
    padding: "0.6rem 1.8rem",
    background: submitBtnDisabled
      ? "#164f84"
      : "linear-gradient(90deg, #164f84 0%, #0083bb 100%)", // gradient
    color: "#ffffff",
    fontWeight: 600,
    borderRadius: "999px", // pill shape
    boxShadow: submitBtnDisabled
      ? "0 2px 4px rgba(0,0,0,0.1)"
      : "0 6px 12px rgba(0,0,0,0.15)", // deeper shadow when active
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    cursor: submitBtnDisabled ? "not-allowed" : "pointer",
    opacity: submitBtnDisabled ? 0.6 : 1,
    transition:
      "background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease",
    border: "none",
  };

  const spinnerStyle = {
    border: "3px solid rgba(255,255,255,0.3)",
    borderTop: "3px solid #ffffff",
    borderRadius: "50%",
    width: "1rem",
    height: "1rem",
    animation: "spin 1s linear infinite",
  };

  const handleMouseOver = (e) => {
    if (!submitBtnDisabled) {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
    }
  };

  const handleMouseOut = (e) => {
    if (!submitBtnDisabled) {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
    }
  };

  return (
    <div
      style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center" }}
    >
      <button
        disabled={submitBtnDisabled}
        type={type}
        onClick={onClick}
        style={buttonStyle}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {submitLoading && <div style={spinnerStyle}></div>}
        {children}
      </button>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
