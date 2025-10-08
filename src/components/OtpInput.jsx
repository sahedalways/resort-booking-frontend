import React, { useState, useRef, useEffect } from "react";

const OtpInput = ({ length = 6, onChange, className, inputStyle }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    onChange?.(otp.join(""));
  }, [otp]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);

      if (value && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .trim()
      .slice(0, length)
      .split("");
    const newOtp = [...otp];
    pasteData.forEach((digit, i) => {
      if (/^\d$/.test(digit)) newOtp[i] = digit;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasteData.length, length - 1)].focus();
  };

  return (
    <div className={`d-flex justify-content-center gap-2 ${className || ""}`}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputRefs.current[index] = el)}
          className="text-center"
          style={{
            width: "50px",
            height: "50px",
            fontSize: "1.5rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            ...inputStyle,
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
