
import Link from 'next/link';

const ToursPage = () => {
  return (
    <section id="tours" className="page" data-aos="fade-up">
      <div className="container">
        <h2>Our Tour Packages</h2>
        <p>Discover our handpicked travel experiences</p>
        <div className="tours-container" style={{ marginTop: '50px' }} data-aos="fade-up">
          <div className="tour-card" data-aos="fade-up">
            <div className="tour-img">
              <img src="https://images.unsplash.com/photo-1590523278191-995cbcda646b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Japan Tour" />
              <div className="tour-badge">Cultural</div>
            </div>
            <div className="tour-content">
              <div className="tour-meta">
                <span><i className="fas fa-calendar"></i> 12 Days</span>
                <span><i className="fas fa-users"></i> Max 10 People</span>
              </div>
              <h3>Japan Cultural Journey</h3>
              <p>Experience the perfect blend of tradition and modernity in Japan. Visit Tokyo, Kyoto, and Osaka with expert local guides.</p>
              <div className="tour-price">$3,499 <span>per person</span></div>
              <Link href="/booking" className="btn btn-accent">Book Tour</Link>
            </div>
          </div>
          <div className="tour-card" data-aos="fade-up">
            <div className="tour-img">
              <img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Italy Tour" />
              <div className="tour-badge">Luxury</div>
            </div>
            <div className="tour-content">
              <div className="tour-meta">
                <span><i className="fas fa-calendar"></i> 14 Days</span>
                <span><i className="fas fa-users"></i> Max 14 People</span>
              </div>
              <h3>Italian Renaissance Tour</h3>
              <p>Explore the art, history, and cuisine of Italy. Visit Rome, Florence, Venice, and the Tuscan countryside.</p>
              <div className="tour-price">$3,899 <span>per person</span></div>
              <Link href="/booking" className="btn btn-accent">Book Tour</Link>
            </div>
          </div>
          <div className="tour-card" data-aos="fade-up">
            <div className="tour-img">
              <img src="https://images.unsplash.com/photo-1599640842225-85d111c60e6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Thailand Tour" />
              <div className="tour-badge">Adventure</div>
            </div>
            <div className="tour-content">
              <div className="tour-meta">
                <span><i className="fas fa-calendar"></i> 10 Days</span>
                <span><i className="fas fa-users"></i> Max 12 People</span>
              </div>
              <h3>Thailand Discovery Tour</h3>
              <p>Discover the vibrant culture, stunning beaches, and delicious cuisine of Thailand. Visit Bangkok, Chiang Mai, and Phuket.</p>
              <div className="tour-price">$2,299 <span>per person</span></div>
              <Link href="/booking" className="btn btn-accent">Book Tour</Link>
            </div>
          </div>
          <div className="tour-card" data-aos="fade-up">
            <div className="tour-img">
              <img src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Egypt Tour" />
              <div className="tour-badge">Historical</div>
            </div>
            <div className="tour-content">
              <div className="tour-meta">
                <span><i className="fas fa-calendar"></i> 9 Days</span>
                <span><i className="fas fa-users"></i> Max 15 People</span>
              </div>
              <h3>Egypt Historical Expedition</h3>
              <p>Journey through ancient Egypt with expert Egyptologists. Visit the Pyramids, Sphinx, Luxor, and cruise the Nile.</p>
              <div className="tour-price">$2,799 <span>per person</span></div>
              <Link href="/booking" className="btn btn-accent">Book Tour</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToursPage;
