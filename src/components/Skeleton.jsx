// components/Skeleton.jsx
const Skeleton = ({ type, className = "" }) => {
  const renderSkeleton = () => {
    switch (type) {
      case "header":
        return (
          <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
            <div className="container">
              <div className="skeleton skeleton-logo"></div>
              <ul className="navbar-nav mx-auto">
                {[...Array(5)].map((_, i) => (
                  <li key={i} className="nav-item">
                    <div className="skeleton skeleton-link"></div>
                  </li>
                ))}
              </ul>
              <div className="d-flex">
                <div className="skeleton skeleton-btn me-2"></div>
                <div className="skeleton skeleton-btn"></div>
              </div>
            </div>
          </nav>
        );

      case "footer":
        return (
          <footer className="footer bg-light mt-auto">
            <div className="container p-4">
              <div className="row g-4 mb-3 pb-3">
                {/* 4 columns */}
                {[...Array(4)].map((_, colIndex) => (
                  <div key={colIndex} className="col-lg-3 col-md-6">
                    <div className="skeleton skeleton-title mb-2"></div>
                    <ul className="list-unstyled mb-0 d-grid gap-1">
                      {[...Array(5)].map((_, i) => (
                        <li key={i}>
                          <div className="skeleton skeleton-link"></div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="row mt-3 pt-3 border-top g-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="col-lg-3 col-md-6">
                    <div className="contact-card">
                      <div className="skeleton skeleton-title mb-2"></div>
                      {[...Array(4)].map((_, j) => (
                        <div
                          key={j}
                          className="skeleton skeleton-line mb-1"
                          style={{ width: `${90 - j * 15}%`, height: "16px" }}
                        ></div>
                      ))}
                      <div
                        className="skeleton skeleton-map-link mt-2"
                        style={{ width: "50%", height: "20px" }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </footer>
        );

      case "card":
        return (
          <div
            className={`card skeleton-card ${className}`}
            style={{ height: "200px" }}
          >
            <div className="skeleton skeleton-card-body"></div>
          </div>
        );

      case "eventList":
        return (
          <div className={`skeleton-homepage ${className}`}>
            {/* Carousel Skeleton */}
            <section className="mb-5">
              <div className="skeleton skeleton-carousel w-100 rounded-4"></div>
              <div className="text-center mt-3">
                <div className="skeleton skeleton-title mx-auto mb-2"></div>
                <div className="skeleton skeleton-subtitle mx-auto mb-3"></div>
                <div className="skeleton skeleton-btn mx-auto"></div>
              </div>
            </section>

            {/* Services Section */}
            <section className="section-gap">
              <div className="container">
                <div className="text-center mb-4">
                  <div className="skeleton skeleton-title mx-auto mb-2"></div>
                  <div className="skeleton skeleton-text mx-auto w-75"></div>
                </div>
                <div className="row g-4 justify-content-center">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="col-12 col-sm-6 col-lg-3">
                      <div className="card border-0 shadow-sm p-3 rounded-4">
                        <div className="skeleton skeleton-img mb-3"></div>
                        <div className="skeleton skeleton-text mx-auto w-75"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Service Boxes Section */}
            <section className="section-gap">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-8">
                    <div className="row g-4">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="col-6 col-md-4 text-center">
                          <div className="skeleton skeleton-icon mx-auto mb-2"></div>
                          <div className="skeleton skeleton-text mx-auto w-75"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-4 text-center mt-5 mt-lg-0">
                    <div className="skeleton skeleton-title mx-auto mb-3"></div>
                    <div className="skeleton skeleton-btn mx-auto"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Form Section */}
            <section className="section-gap">
              <div className="container">
                <div className="text-center mb-4">
                  <div className="skeleton skeleton-title mx-auto mb-2"></div>
                  <div className="skeleton skeleton-text mx-auto w-75"></div>
                </div>
                <div className="col-md-8 mx-auto">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="skeleton skeleton-input mb-3"></div>
                  ))}
                  <div className="skeleton skeleton-textarea mb-3"></div>
                  <div className="skeleton skeleton-btn mx-auto"></div>
                </div>
              </div>
            </section>
          </div>
        );

      case "singleEvent":
        return (
          <section className={`skeleton-event-details ${className}`}>
            {/* Header Section */}
            <div className="position-relative mb-5">
              <div
                className="skeleton skeleton-hero w-100 rounded-4"
                style={{ height: "400px" }}
              ></div>
              <div className="text-center mt-3">
                <div
                  className="skeleton skeleton-title mx-auto mb-2"
                  style={{ width: "300px", height: "32px" }}
                ></div>
                <div
                  className="skeleton skeleton-subtitle mx-auto"
                  style={{ width: "500px", height: "20px" }}
                ></div>
              </div>
            </div>

            {/* Main Content */}
            <div className="section-gap">
              <div className="container">
                <div className="row g-4">
                  {/* Left Column Text */}
                  <div className="col-md-8">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="mb-3">
                        <div
                          className="skeleton skeleton-text w-100"
                          style={{ height: "20px" }}
                        ></div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column Image */}
                  <div className="col-md-4">
                    <div
                      className="skeleton skeleton-img w-100 rounded-4"
                      style={{ height: "250px" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Section */}
            <div className="section-gap">
              <div className="container">
                <div className="row g-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="col-md-3">
                      <div
                        className="skeleton skeleton-img w-100 rounded-4"
                        style={{ height: "150px" }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="section-gap">
              <div className="container">
                <div className="col-md-8 mx-auto">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="skeleton skeleton-input mb-3"
                      style={{ height: "40px" }}
                    ></div>
                  ))}
                  <div
                    className="skeleton skeleton-textarea mb-3"
                    style={{ height: "120px" }}
                  ></div>
                  <div
                    className="skeleton skeleton-btn mx-auto"
                    style={{ width: "200px", height: "40px" }}
                  ></div>
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return (
          <div className={`skeleton ${className}`} style={{ height: "20px" }} />
        );
    }
  };

  return renderSkeleton();
};

export default Skeleton;
