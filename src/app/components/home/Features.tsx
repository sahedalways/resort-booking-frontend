
const Features = () => {
  return (
    <section className="features">
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <h2>Why Choose Us</h2>
          <p>We provide exceptional service to make your vacation perfect</p>
        </div>
        <div className="features-grid">
          <div className="feature-card" data-aos="fade-left">
            <div className="feature-icon">
              <i className="fas fa-globe-americas"></i>
            </div>
            <h3>Global Destinations</h3>
            <p>Access to over 500 destinations worldwide with curated experiences in each location.</p>
          </div>
          <div className="feature-card" data-aos="fade-bottom">
            <div className="feature-icon">
              <i className="fas fa-hotel"></i>
            </div>
            <h3>Luxury Resorts</h3>
            <p>Exclusive partnerships with premium resorts offering special amenities and rates.</p>
          </div>
          <div className="feature-card" data-aos="fade-right">
            <div className="feature-icon">
              <i className="fas fa-headset"></i>
            </div>
            <h3>24/7 Support</h3>
            <p>Dedicated travel concierge available around the clock to assist with your needs.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
