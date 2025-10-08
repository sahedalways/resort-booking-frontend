import Image from "next/image";

const EventHero = ({ eventData }) => {
  const { hero_url, title, sub_title, phone_number } = eventData.event_top_info;

  return (
    <>
      <section
        className="hero-section position-relative w-100"
        style={{ overflow: "hidden" }}
      >
        <div className="position-relative w-100">
          <Image
            src={hero_url || "/img/default-hero.jpg"}
            alt={title || "Event Hero"}
            width={1920}
            height={800}
            className="w-100 object-fit-cover"
            priority
            style={{
              height: "80vh", // adjust height as needed (e.g., 100vh for full screen)
              objectFit: "cover",
            }}
          />

          {/* Dark overlay */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          ></div>
        </div>

        {/* Caption */}
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
          <h1 className="fw-bold mb-2" style={{ fontSize: "3rem" }}>
            {title}
          </h1>
          <h3 className="fw-normal mb-3" style={{ fontSize: "1.5rem" }}>
            {sub_title}
          </h3>

          {phone_number && (
            <a href={`tel:${phone_number}`}>
              <button className="btn btn-warning rounded-pill fw-semibold px-4 py-2">
                CALL NOW
              </button>
            </a>
          )}
        </div>
      </section>
    </>
  );
};

export default EventHero;
