"use client";

const EventHero = ({ eventData }) => {
  const { hero_url, title, sub_title, phone_number } = eventData.event_top_info;

  return (
    <section
      className="position-relative w-100 d-flex align-items-center justify-content-center text-center text-white"
      style={{
        height: "65vh",
        overflow: "hidden",
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          zIndex: "-1",
          backgroundImage: `url(${hero_url || "/img/default-hero.jpg"})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.6)",
        }}
      ></div>

      {/* Caption */}
      <div className="px-3 w-100">
        <h1 className="fw-bold mb-2 text-block-50">{title}</h1>
        <h3 className="fw-normal mb-3 text-block-20">{sub_title}</h3>

        {phone_number && (
          <a href={`tel:${phone_number}`}>
            <button className="btn btn-warning rounded-pill fw-semibold px-4 py-2 text-block-16">
              CALL NOW
            </button>
          </a>
        )}
      </div>
    </section>
  );
};

export default EventHero;
