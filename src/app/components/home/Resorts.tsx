
import Link from 'next/link';

const Resorts = () => {
  return (
    <section className="resorts">
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <h2>Featured Resorts</h2>
          <p>Luxury accommodations in paradise destinations</p>
        </div>
        <div className="resort-card">
          <div className="resort-img" data-aos="fade-right">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Maldives Resort" />
          </div>
          <div className="resort-info" data-aos="fade-left">
            <h3>Ocean Paradise Resort & Spa</h3>
            <p>Experience luxury in overwater bungalows with private pools and direct ocean access. Our resort features world-class dining, spa services, and water activities.</p>
            <div className="resort-features">
              <span className="feature-tag">Private Beach</span>
              <span className="feature-tag">Infinity Pool</span>
              <span className="feature-tag">Spa Center</span>
              <span className="feature-tag">5 Restaurants</span>
            </div>
            <div className="tour-price">From $499 <span>per night</span></div>
            <Link href="/booking" className="btn">View Details</Link>
          </div>
        </div>
        <div className="resort-card">
          <div className="resort-img" data-aos="fade-right">
            <img src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Mountain Resort" />
          </div>
          <div className="resort-info" data-aos="fade-left">
            <h3>Alpine Mountain Retreat</h3>
            <p>Nestled in the Swiss Alps, our mountain retreat offers breathtaking views, ski-in/ski-out access, and cozy luxury chalets with fireplaces and private hot tubs.</p>
            <div className="resort-features">
              <span className="feature-tag">Ski Access</span>
              <span className="feature-tag">Hot Tubs</span>
              <span className="feature-tag">Fine Dining</span>
              <span className="feature-tag">Spa & Wellness</span>
            </div>
            <div className="tour-price">From $399 <span>per night</span></div>
            <Link href="/booking" className="btn">View Details</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resorts;
