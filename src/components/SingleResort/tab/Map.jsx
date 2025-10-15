const Map = ({ mapUrl, sectionTitle }) => {
  return (
    <section className="section-gap-sm">
      <div className="container">
        {sectionTitle && (
          <h2 className="text-block-20 primary-color mb-3">{sectionTitle}</h2>
        )}
        <div className="row">
          <div className="col">
            <iframe
              src={mapUrl}
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '10px' }}
              allowFullScreen=""
              loading="lazy"
              
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
