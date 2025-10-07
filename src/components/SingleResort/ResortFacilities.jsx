export default function ResortFacilities({ facilities }) {
  const displayedFacilities = facilities.slice(0, 8);

  return (
    <section className="section-gap-sm">
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <h3 className="text-block-20 primary-color mb-3">
              Highlighted Facilities
            </h3>
            <div className="facilities-grid">
              {displayedFacilities.map((facility, idx) => (
                <div key={idx} className="facility-item">
                  <span className="wifi-icon">
                    <i className={facility.icon}></i>
                  </span>{" "}
                  {facility.type_name || "Facility"}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
