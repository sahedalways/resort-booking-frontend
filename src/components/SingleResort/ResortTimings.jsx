import Image from "next/image";

export default function ResortTimings({ resort }) {
  return (
    <section className="section-gap-sm">
      <div className="container">
        <div className="row">
          {/* Night Stay */}
          <div className="col-md-6 mb-4">
            <h5 className="text-block-20 primary-color mb-3">Night Stay</h5>
            <div className="row gx-3">
              <TimeBox label="Check-in" time={resort.n_check_in} />
              <TimeBox label="Check-out" time={resort.n_check_out} />
            </div>
          </div>

          {/* Day Long */}
          <div className="col-md-6 mb-4">
            <h5 className="text-block-20 primary-color mb-3">Day Long</h5>
            <div className="row gx-3">
              <TimeBox label="Check-in" time={resort.d_check_in} />
              <TimeBox label="Check-out" time={resort.d_check_out} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable single time box
function TimeBox({ label, time }) {
  const formatTime12Hour = (time24) => {
    if (!time24) return "N/A";
    const [hours, minutes] = time24.split(":");
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="col-6">
      <div className="custom-time-box">
        <Image
          width={30}
          height={30}
          src="/img/door.png"
          alt=""
          className="time-box-img"
        />
        <div>
          <span className="icon-text">{label}</span>
          <div className="time-text">{formatTime12Hour(time)}</div>
        </div>
      </div>
    </div>
  );
}
