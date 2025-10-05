import Image from "next/image";

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
              <div className="text-center">
                <h3 className="text-block-32 position-relative primary-color">Flawless Wedding Planning for Your Dream Day</h3>
                <p className="subtitle text-dark">
                  We provide exceptional service to make your vacation perfect
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
