import Link from "next/link";
export default function Contact() {
  return (
    <section className="section-gap">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-header-container">
              <h1 className="main-title">
                Ready to Make It Happen? Let’s Talk!
              </h1>
              <p className="primary-color fw-semibold col-md-8 col-12">
                Let us help you find the venue of your dreams. Contact us today
                to start your journey to an unforgettable
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
  );
}
