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
      default:
        return (
          <div className={`skeleton ${className}`} style={{ height: "20px" }} />
        );
    }
  };

  return renderSkeleton();
};

export default Skeleton;
