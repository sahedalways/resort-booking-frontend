const Map = ({ mapUrl }) => {
  return (
    <>
      <section className="section-gap-sm">
        <div className="container">
          <div className="row">
            <div className="col">
              <iframe
                src={mapUrl}
                width="400"
                height="400"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Map;
