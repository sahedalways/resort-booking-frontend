
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-container">
          <div className="footer-col">
            <h3>Prokiti-Bari</h3>
            <p>Creating unforgettable travel experiences with personalized service and attention to detail since 2010.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-pinterest"></i></a>
            </div>
          </div>
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/tours">Tours</Link></li>
              <li><Link href="/resorts">Resorts</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Contact Us</h3>
            <p><i className="fas fa-map-marker-alt"></i> 123 Paradise Road, Miami, FL 33101</p>
            <p><i className="fas fa-phone-alt"></i> +1 (800) 555-1234</p>
            <p><i className="fas fa-envelope"></i> info@paradiseescapes.com</p>
          </div>
          <div className="footer-col">
            <h3>Newsletter</h3>
            <p>Subscribe to receive travel inspiration, exclusive offers, and updates.</p>
            <form>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none' }} />
              </div>
              <button type="submit" className="btn btn-accent" style={{ width: '100%' }}>Subscribe</button>
            </form>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2023 Prokiti-Bari. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
