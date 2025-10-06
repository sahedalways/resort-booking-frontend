"use client";
import Image from "next/image";
import LightGallery from "lightgallery/react";
import Link from "next/link";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const images = [
  { src: "/img/event-2.jpg", alt: "Event 1" },
  { src: "/img/event-3.jpg", alt: "Engagement" },
  { src: "/img/event-5.jpg", alt: "Corporate" },
  { src: "/img/event-6.jpg", alt: "Corporate" },
  { src: "/img/event-2.jpg", alt: "Event 1" },
  { src: "/img/event-3.jpg", alt: "Engagement" },
  { src: "/img/event-5.jpg", alt: "Corporate" },
  { src: "/img/event-6.jpg", alt: "Corporate" },
];

export default function EventDetails() {
  return (
    <>
      <section className="position-relative">
        {/* Header Section */}
        <div className="event-details-header mb-5">
          <div className="aboutus-overlay"></div>
          <div className="position-relative">
            <h1 className="text-block-50 fw-bold">Event Details</h1>
            <p className="text-block-20">
              Your trusted partner in planning the perfect escape.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div>
                <h3 className="text-block-32 position-relative underLine primary-color">
                  Expert Wedding Planning Services for Your Perfect Day
                  <span className=""></span>
                </h3>

                <div className="mt-4">
                  <h2 className="text-block-20">
                    Your Dream Wedding, Perfectly Planned
                  </h2>
                  <p className="paragraph-sm fw-normal text-dark">
                    At The Wedding Vogue we believe every love story is unique
                    and deserves a wedding that reflects your individual style
                    and vision. Our expert wedding planning services are
                    designed to make your special day seamless, stress-free, and
                    unforgettable. From intimate gatherings to grand
                    celebrations, we ensure every detail is meticulously planned
                    and flawlessly executed.
                  </p>
                </div>

                <div className="mt-4">
                  <h4 className="text-block-20">Our Services Include:</h4>
                  <ul className="list-unstyled">
                    <li className="mb-2 paragraph-sm text-dark">
                      <i className="bi bi-arrow-right-circle me-3 primary-color"></i>
                      Consultation and Planning
                    </li>
                    <li className="mb-2 paragraph-sm text-dark">
                      <i className="bi bi-arrow-right-circle me-3 primary-color"></i>
                      Design and Styling
                    </li>
                    <li className="mb-2 paragraph-sm text-dark">
                      <i className="bi bi-arrow-right-circle me-3 primary-color"></i>
                      Logistics and Coordination
                    </li>
                    <li className="mb-2 paragraph-sm text-dark">
                      <i className="bi bi-arrow-right-circle me-3 primary-color"></i>
                      Ceremony and Reception
                    </li>
                  </ul>
                  <p></p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <Image
                src="/img/event-1.jpg"
                alt="Discount"
                className="img-fluid"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-gap">
        <div className="container">
          <div className="row g-4">
            <div className="col">
              <div className="section-header-container">
                <h3 className="text-block-32 position-relative primary-color mb-0">
                  Flawless Wedding Planning for Your Dream Day
                </h3>
                <p className="subtitle text-dark">
                  We provide exceptional service to make your vacation perfect
                </p>
              </div>
            </div>

            {/* ✅ Replace inner row with a column */}
            <div className="col-12">
              <LightGallery
                showCloseIcon={true}
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                elementClassNames="row g-4"
              >
                {images.map((image, idx) => (
                  <a href={image.src} className="col-md-3" key={idx}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={500}
                      height={500}
                      className="img-fluid"
                    />
                  </a>
                ))}
              </LightGallery>
            </div>
          </div>
        </div>
      </section>

      <section className="section-gap">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-header-container">
                <h1 className="main-title">
                  Ready to Make It Happen? Let’s Talk!
                </h1>
                <p className="primary-color fw-semibold col-md-8 col-12">
                  Let us help you find the venue of your dreams. Contact us
                  today to start your journey to an unforgettable
                </p>
              </div>
            </div>

            <div className="col-md-8 mx-auto">
              <form>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <input
                      type="text"
                      className="form-control shadow-none"
                      id="yourName"
                      placeholder="Your Name *"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="tel"
                      className="form-control shadow-none"
                      id="yourPhone"
                      placeholder="Your Phone *"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <input
                      type="text"
                      className="form-control shadow-none"
                      id="dateOfFunction"
                      placeholder="Date of Function *"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control shadow-none"
                      id="gatheringSize"
                      placeholder="Gathering Size *"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <input
                      type="text"
                      className="form-control shadow-none"
                      id="preferredLocation"
                      placeholder="Preferred Location *"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="dropdown">
                      <button
                        className="btn btn-outline-secondary dropdown-toggle custom-dropdown-style"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        Select Budget
                      </button>
                      <ul className="dropdown-menu w-100">
                        <li>
                          <Link className="dropdown-item" href="#">
                            $100 - $500
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            $500 - $1,000
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="#">
                            $1,000+
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-12">
                    <textarea
                      className="form-control shadow-none"
                      id="tellUsMore"
                      rows={5}
                      placeholder="Tell Us More"
                    ></textarea>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-custom">
                      SEND YOUR MESSAGE
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
