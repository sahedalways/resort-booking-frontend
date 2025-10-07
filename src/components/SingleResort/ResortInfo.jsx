export default function ResortInfo({ resort }) {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="resort-info">
              <h1 className="resort-title text-block-24 mb-3">{resort.name}</h1>
              <div className="details-container">
                <span className="detail-item paragraph-sm">
                  <span className="icon">🚗</span>
                  {resort.distance} km from city center
                </span>
                <span className="separator">
                  <i className="bi bi-dot"></i>
                </span>
                <span className="detail-item paragraph-sm">
                  <span className="icon">📍</span>
                  {resort.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
