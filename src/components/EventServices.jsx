import Image from "next/image";
import Link from "next/link";

const EventServices = ({ eventData }) => {
  return (
    <>
      <section className="section-gap">
        <div className="container">
          {/* Section Header */}
          <div className="row">
            <div className="col text-center">
              <div className="section-header-container">
                <h1 className="main-title">Our Services</h1>
                <p className="primary-color fw-semibold col-md-8 mx-auto">
                  Get your events designed, planned and organized by the leading
                  event management planners in Bangladesh. Enjoy hassle-free
                  events, parties, conferences, weddings, PR events, and more!
                </p>
              </div>
            </div>
          </div>

          {/* Services List */}
          <div className="row g-4 justify-content-center mt-4">
            {eventData.event_services.map((service) => (
              <div key={service.id} className="col-12 col-sm-6 col-lg-3">
                <Link
                  href={`/events/${service.id}`}
                  className="text-decoration-none"
                >
                  <div className="card service-card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                    <div className="image-wrapper">
                      <Image
                        width={400}
                        height={250}
                        src={service.thumbnail_url}
                        className="card-img-top object-fit-cover"
                        alt={service.title}
                      />
                    </div>
                    <div className="card-body p-4 text-center">
                      <h5 className="card-title text-uppercase m-0 text-block-20 primary-color fw-semibold">
                        {service.title}
                      </h5>
                      <p className="mt-2 text-muted small">
                        {service.description?.substring(0, 80)}...
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}

            {/* No data fallback */}
            {eventData.event_services.length === 0 && (
              <div className="col-12 text-center">
                <p className="text-muted">No services found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default EventServices;
