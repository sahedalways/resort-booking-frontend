import Image from "next/image";

export default function ResortTimings({ resort }) {
  return (
    <section className="section-gap-sm" style={{ gap: "12px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-4">
            {" "}
            <h6 className="text-block-14 primary-color mb-2">Night Stay</h6>
            <div className="row gx-3">
              {" "}
              <TimeBox label="Check-in" time={resort.n_check_in} smallText />
              <TimeBox label="Check-out" time={resort.n_check_out} smallText />
            </div>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            {" "}
            {/* col-lg-4 makes it one-third width on large screens */}
            <h6 className="text-block-14 primary-color mb-2">Day Long</h6>
            <div className="row gx-3">
              {" "}
              <TimeBox label="Check-in" time={resort.d_check_in} smallText />
              <TimeBox label="Check-out" time={resort.d_check_out} smallText />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable single time box (No changes needed here)
function TimeBox({ label, time, smallText }) {
  const formatTime12Hour = (time24) => {
    if (!time24) return "N/A";
    const [hours, minutes] = time24.split(":");
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const labelStyle = smallText ? { fontSize: "0.75rem" } : {};
  const timeStyle = smallText ? { fontSize: "0.8rem" } : {};

  return (
    <div style={{ minWidth: "120px", maxWidth: "45%" }}>
      <div
        className="custom-time-box"
        style={{ gap: "8px", padding: "4px 6px", height: "60px" }}
      >
        <Image
          width={20}
          height={20}
          src="/img/door.png"
          alt=""
          className="time-box-img"
        />
        <div>
          <span className="icon-text" style={labelStyle}>
            {label}
          </span>
          <div className="time-text" style={timeStyle}>
            {formatTime12Hour(time)}
          </div>
        </div>
      </div>
    </div>
  );
}
