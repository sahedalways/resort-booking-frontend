// components/ResortSkeleton.jsx
const ResortSkeleton = () => {
  return (
    <div className="resort-details-skeleton">
      {/* Breadcrumb */}
      <div className="breadcrumb-container mb-4">
        <div className="container">
          <div className="skeleton skeleton-breadcrumb w-50"></div>
        </div>
      </div>

      {/* Resort Info */}
      <section className="mb-4">
        <div className="container">
          <div className="skeleton skeleton-title w-75 mb-2"></div>
          <div className="skeleton skeleton-text w-50"></div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mb-4">
        <div className="container">
          <div className="skeleton skeleton-image mb-3"></div>
          <div className="d-flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton skeleton-thumb w-25 h-20"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Description + Map */}
      <section className="mb-4">
        <div className="container d-flex flex-wrap gap-3">
          <div className="skeleton skeleton-text w-75 h-32"></div>
          <div className="skeleton skeleton-map w-25 h-32"></div>
        </div>
      </section>

      {/* Highlighted Facilities */}
      <section className="mb-4">
        <div className="container">
          <div className="skeleton skeleton-title w-50 mb-3"></div>
          <div className="d-flex flex-wrap gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton skeleton-chip w-24 h-8"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Night Stay / Day Long */}
      <section className="mb-4">
        <div className="container d-flex flex-wrap gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton skeleton-box w-48 h-20"></div>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <section className="mb-4">
        <div className="container d-flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton skeleton-tab w-24 h-10"></div>
          ))}
        </div>
      </section>

      {/* Rooms Section */}
      <section className="mb-4">
        <div className="container">
          <div className="skeleton skeleton-card mb-3 w-full h-64"></div>
          <div className="skeleton skeleton-card w-full h-48"></div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="mb-4">
        <div className="container d-flex flex-wrap gap-3">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="skeleton skeleton-card w-30 h-32"></div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="mb-4">
        <div className="container">
          <div className="skeleton skeleton-map w-full h-64"></div>
        </div>
      </section>

      {/* Table Notes */}
      <section className="mb-4">
        <div className="container">
          <div className="skeleton skeleton-title w-50 mb-2"></div>
          <div className="skeleton skeleton-table w-full h-48"></div>
        </div>
      </section>
    </div>
  );
};

export default ResortSkeleton;
