
import Link from 'next/link';

const ResortsPage = () => {
  return (
    <section id="resorts" className="page" data-aos="fade-up">
      <div className="container">
        <h2>Premium Resort Collection</h2>
        <p>Luxury accommodations in breathtaking locations</p>
        <div className="resort-card" style={{ marginTop: '50px' }} >
          <div className="resort-img" data-aos="fade-right">
            <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Bora Bora Resort" />
          </div>
          <div className="resort-info" data-aos="fade-left">
            <h3>Bora Bora Overwater Paradise</h3>
            <p>Experience ultimate luxury in our overwater villas with glass floors, private infinity pools, and direct lagoon access. Enjoy world-class dining and spa services with panoramic ocean views.</p>
            <div className="resort-features">
              <span className="feature-tag">Overwater Villas</span>
              <span className="feature-tag">Private Pool</span>
              <span className="feature-tag">Spa & Wellness</span>
              <span className="feature-tag">Water Sports</span>
            </div>
            <div className="tour-price">From $899 <span>per night</span></div>
            <Link href="/booking" className="btn">Book Resort</Link>
          </div>
        </div>
        <div className="resort-card">
          <div className="resort-img" data-aos="fade-right">
            <img src="https://images.unsplash.com/photo-1561501900-3701fa6a0864?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Santorini Resort" />
          </div>
          <div className="resort-info" data-aos="fade-left">
            <h3>Santorini Cliffside Retreat</h3>
            <p>Perched on the caldera cliffs, our Santorini resort offers breathtaking views of the Aegean Sea. Enjoy cave-style suites with private terraces, infinity pools, and gourmet dining.</p>
            <div className="resort-features">
              <span className="feature-tag">Caldera Views</span>
              <span className="feature-tag">Infinity Pool</span>
              <span className="feature-tag">Wine Tasting</span>
              <span className="feature-tag">Sunset Views</span>
            </div>
            <div className="tour-price">From $749 <span>per night</span></div>
            <Link href="/booking" className="btn">Book Resort</Link>
          </div>
        </div>
        <div className="resort-card">
          <div className="resort-img" data-aos="fade-right">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Maldives Resort" />
          </div>
          <div className="resort-info" data-aos="fade-left">
            <h3>Maldives Private Island Resort</h3>
            <p>Escape to your own private island paradise. Our exclusive resort features beachfront and overwater villas, a world-class spa, and exceptional diving experiences.</p>
            <div className="resort-features">
              <span className="feature-tag">Private Island</span>
              <span className="feature-tag">Diving Center</span>
              <span className="feature-tag">All-Inclusive</span>
              <span className="feature-tag">Spa Sanctuary</span>
            </div>
            <div className="tour-price">From $1,099 <span>per night</span></div>
            <Link href="/booking" className="btn">Book Resort</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResortsPage;
