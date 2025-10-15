export default function ResortDescription({ resort, mapUrl }) {
  return (
    <section className="section-gap-sm">
      <div className="container">
        <div className="row">
          {/* Description */}
          <div className="col-md-8">
            <div className="description-text">
              <h2 className="text-block-20 primary-color mb-3">Description</h2>
              <p className="paragraph-md">{resort.desc}</p>
            </div>
          </div>

          {/* Map */}
          <div className="col-md-4">
            <div className="map-container">
              <iframe
                src={
                  mapUrl ||
                  "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d117763.29359353302!2d89.06570155!3d22.7244155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1759204497675!5m2!1sen!2sbd"
                }
                width="100%"
                height="200"
                loading="lazy"
                className="rounded-3"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
