'use client'; // if you’re in App Router (app/ folder)

import Image from "next/image";
import Link from "next/link";

export default function Events() {
  return (
    <>
      <section>
        <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide"
          data-bs-ride="carousel"
          data-bs-pause="false"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div className="carousel-inner">
            {/* Slide 1 */}
            <div className="carousel-item active" data-bs-interval="200000">
              <div className="position-relative">
                <Image
                  src="/img/event_img.png"
                  className="d-block w-100 object-fit-cover"
                  alt="First slide"
                  width={1200}
                  height={600}
                />
                {/* Black overlay */}
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                ></div>
              </div>
              <div className="carousel-caption d-block">
                <h1 className="text-block-50">Choose the Best Event Planner</h1>
                <h3 className="text-block-24">
                  BookingXpert Event Planner your premier choice for weddings,
                  parties & corporate events.
                </h3>
                <button className="btn btn-warning rounded-pill primary-color fw-semibold custom-padding mt-3">
                  CALL NOW
                </button>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item" data-bs-interval="200000">
              <div className="position-relative">
                <Image
                  src="/img/resort_img.png"
                  className="d-block w-100 object-fit-cover"
                  alt="Second slide"
                  width={1200}
                  height={600}
                />
                {/* Black overlay */}
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                ></div>
              </div>
              <div className="carousel-caption d-block">
                <h1>Second slide label</h1>
                <h3>
                  Some representative placeholder content for the second slide.
                </h3>
                <button className="btn btn-warning rounded-pill primary-color fw-semibold custom-padding mt-3">
                  CALL NOW
                </button>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="carousel-item" data-bs-interval="200000">
              <div className="position-relative">
                <Image
                  src="/img/resort_img.png"
                  className="d-block w-100 object-fit-cover"
                  alt="Third slide"
                  width={1200}
                  height={600}
                />
                {/* Black overlay */}
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                ></div>
              </div>
              <div className="carousel-caption d-block">
                <h1>Third slide label</h1>
                <h3>
                  Some representative placeholder content for the third slide.
                </h3>
                <button className="btn btn-warning rounded-pill primary-color fw-semibold custom-padding mt-3">
                  CALL NOW
                </button>
              </div>
            </div>
          </div>

          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      <section className="section-gap">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section-header-container">
                <h1 className="main-title">Our Services</h1>
                <p className="primary-color fw-semibold col-md-8 col-12">
                  Get your events designed, planned and organized by the leading
                  event management planners in Bangladesh. Enjoy hassle-free
                  events, parties, conferences, wedding, PR events, and what
                  not!
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card service-card h-100 shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="image-wrapper">
                  <Image
                    width={300}
                    height={150}
                    src="/img/corporate.jpg"
                    className="card-img-top object-fit-cover"
                    alt="Corporate Events Image"
                  />
                </div>
                <div className="card-body p-4 text-center">
                  <h5 className="card-title text-uppercase m-0 text-block-20 primary-color fw-semibold">
                    Corporate Events
                  </h5>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card service-card h-100 shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="image-wrapper">
                  <Image
                    width={300}
                    height={150}
                    src="/img/engment.jpg"
                    className="card-img-top object-fit-cover"
                    alt="Wedding Events Image"
                  />
                </div>
                <div className="card-body p-4 text-center">
                  <h5 className="card-title text-uppercase m-0 text-block-20 primary-color fw-semibold">
                    Wedding Events
                  </h5>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card service-card h-100 shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="image-wrapper">
                  <Image
                    width={300}
                    height={150}
                    src="/img/tran.jpg"
                    className="card-img-top object-fit-cover"
                    alt="Celebrity Management Image"
                  />
                </div>
                <div className="card-body p-4 text-center">
                  <h5 className="card-title text-uppercase m-0 text-block-20 primary-color fw-semibold">
                    Celebrity Management
                  </h5>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card service-card h-100 shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="image-wrapper">
                  <Image
                    width={300}
                    height={150}
                    src="/img/corpevent.jpg"
                    className="card-img-top object-fit-cover"
                    alt="PR Management Image"
                  />
                </div>
                <div className="card-body p-4 text-center">
                  <h5 className="card-title text-uppercase m-0 text-block-20 primary-color fw-semibold">
                    PR Management
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="row g-4">
                <div className="col-6 col-md-4 text-center">
                  <div className="service-box">
                    <i className="bi bi-balloon-heart fs-2 secondary-color"></i>
                  </div>
                  <div className="service-text">Decorations</div>
                </div>
                <div className="col-6 col-md-4 text-center">
                  <div className="service-box">
                    <i className="bi bi-music-note-beamed fs-2 secondary-color"></i>
                  </div>
                  <div className="service-text">Entertainment Services</div>
                </div>
                <div className="col-6 col-md-4 text-center">
                  <div className="service-box">
                    <i className="bi bi-brush fs-2 secondary-color"></i>
                  </div>
                  <div className="service-text">Creative Services</div>
                </div>
                <div className="col-6 col-md-4 text-center">
                  <div className="service-box">
                    <i className="bi bi-gift fs-2 secondary-color"></i>
                  </div>
                  <div className="service-text">Travel & Transportation</div>
                </div>
                <div className="col-6 col-md-4 text-center">
                  <div className="service-box">
                    <i className="bi bi-person-workspace fs-2 secondary-color"></i>
                  </div>
                  <div className="service-text">Planning & Designing</div>
                </div>
                <div className="col-6 col-md-4 text-center">
                  <div className="service-box">
                    <i className="bi bi-cup-straw fs-2 secondary-color"></i>
                  </div>
                  <div className="service-text">Food and Catering</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 text-center text-lg-start mt-5 mt-lg-0">
              <h2 className="main-title">
                What we <br className="d-lg-block d-none" /> offer
              </h2>
              <Link href="/events/1">
                <button className="btn btn-custom mt-3">MORE SERVICE</button>
              </Link>
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