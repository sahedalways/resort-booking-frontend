
import Link from 'next/link';

const Tours = () => {
  return (
    <section className="tours">
      <div className="container">
        <div className="section-title" data-aos="fade-left">
          <h2>Popular Tour Packages</h2>
          <p>Carefully crafted experiences for every traveler</p>
        </div>
        <div className="tours-container">
          <div className="tour-card" data-aos="fade-right">
            <div className="tour-img">
              <img src="https://images.unsplash.com/photo-1754999809963-79a41e8fb648?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Bali Adventure" />
              <div className="tour-badge">Best Seller</div>
            </div>
            <div className="tour-content">
              <div className="tour-meta">
                <span><i className="fas fa-calendar"></i> 7 Days</span>
                <span><i className="fas fa-users"></i> Max 12 People</span>
              </div>
              <h3>Bali Cultural Adventure</h3>
              <p>Explore the rich culture and stunning landscapes of Bali with our expert guides.</p>
              <div className="tour-price">$1,299 <span>per person</span></div>
              <Link href="/booking" className="btn btn-accent">Book Tour</Link>
            </div>
          </div>
          <div className="tour-card" data-aos="fade-down">
            <div className="tour-img">
              <img src="https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Greek Islands" />
              <div className="tour-badge">New</div>
            </div>
            <div className="tour-content">
              <div className="tour-meta">
                <span><i className="fas fa-calendar"></i> 10 Days</span>
                <span><i className="fas fa-users"></i> Max 15 People</span>
              </div>
              <h3>Greek Islands Cruise</h3>
              <p>Discover the beauty of the Greek Islands on a luxury cruise experience.</p>
              <div className="tour-price">$2,499 <span>per person</span></div>
              <Link href="/booking" className="btn btn-accent">Book Tour</Link>
            </div>
          </div>
          <div className="tour-card" data-aos="fade-left">
            <div className="tour-img">
              <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Safari" />
              <div className="tour-badge">Limited Spots</div>
            </div>
            <div className="tour-content">
              <div className="tour-meta">
                <span><i className="fas fa-calendar"></i> 8 Days</span>
                <span><i className="fas fa-users"></i> Max 8 People</span>
              </div>
              <h3>African Safari Expedition</h3>
              <p>Get up close with wildlife in their natural habitat on this unforgettable journey.</p>
              <div className="tour-price">$3,199 <span>per person</span></div>
              <Link href="/booking" className="btn btn-accent">Book Tour</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tours;
