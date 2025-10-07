import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HotelRoomFacilities = ({ resortData }) => {
  return (
    <>
      <section className="section-gap-sm">
        <div className="container">
          <div className="row">
            <div className="col">
              <h3 className="text-block-20 primary-color mb-3">
                Hotel and Room facilities
              </h3>
            </div>
          </div>

          <div className="row">
            {/** Group facilities by facility name */}
            {Object.values(
              resortData?.facilities?.reduce((acc, item) => {
                const key = item.facility.name;
                if (!acc[key]) acc[key] = { ...item.facility, items: [] };
                acc[key].items.push(item);
                return acc;
              }, {})
            ).map((facility) => (
              <div key={facility.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card feature-card">
                  <div className="d-flex align-items-center mb-3">
                    <i className={`${facility.icon} feature-icon`}></i>
                    <span className="feature-title ms-2">{facility.name}</span>
                  </div>
                  <ul className="list-unstyled">
                    {facility.items.map((item) => (
                      <li
                        key={item.id}
                        className="d-flex align-items-center feature-item"
                      >
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="check-icon me-2"
                        />
                        {item.type_name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HotelRoomFacilities;
