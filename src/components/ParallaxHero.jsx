"use client";

const ParallaxHero = ({ title, subtitle, image, height = "65vh" }) => {
  return (
    <section
      className="position-relative w-100 d-flex align-items-center justify-content-center text-center text-white"
      style={{
        height,
        overflow: "hidden",
      }}
    >
      {/* Background Image with Parallax Effect */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          zIndex: "-1",
          backgroundImage: `url('${image || "/img/default-hero.png"}')`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.5)",
        }}
      ></div>

      <div className="px-3 w-100">
        <h1 className="fw-bold mb-2 text-block-50">{title || "Title"}</h1>
        {subtitle && (
          <h4 className="fw-normal mb-0 text-block-20">{subtitle}</h4>
        )}
      </div>
    </section>
  );
};

export default ParallaxHero;
