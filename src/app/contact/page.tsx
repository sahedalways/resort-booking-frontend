
"use client";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thank you for your message! We will respond to your inquiry as soon as possible.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="page">
      <div className="container">
        <div className="section-title">
          <h2>Contact Us</h2>
          <p>We're here to help plan your perfect getaway</p>
        </div>
        <div className="resort-card" style={{ maxWidth: '1000px', margin: '0 auto' }} >
          <div className="resort-info" data-aos="fade-up">
            <h3>Get In Touch</h3>
            <p>Have questions about our tours or resorts? Our travel specialists are ready to assist you in planning your dream vacation.</p>
            <div className="contact-info" style={{ margin: '30px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <i className="fas fa-map-marker-alt" style={{ fontSize: '1.5rem', color: 'var(--primary)', marginRight: '15px' }}></i>
                <div>
                  <h4>Our Office</h4>
                  <p>123 Paradise Road, Miami, FL 33101, USA</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <i className="fas fa-phone-alt" style={{ fontSize: '1.5rem', color: 'var(--primary)', marginRight: '15px' }}></i>
                <div>
                  <h4>Phone</h4>
                  <p>+1 (800) 555-1234</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <i className="fas fa-envelope" style={{ fontSize: '1.5rem', color: 'var(--primary)', marginRight: '15px' }}></i>
                <div>
                  <h4>Email</h4>
                  <p>info@paradiseescapes.com</p>
                </div>
              </div>
            </div>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-pinterest"></i></a>
            </div>
          </div>
          <div className="resort-img" data-aos="fade-down">
            <div style={{ padding: '30px' }}>
              <h3>Send Us a Message</h3>
              <form id="contactForm" style={{ marginTop: '20px' }} onSubmit={handleSubmit}>
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Subject" />
                </div>
                <div className="form-group">
                  <textarea rows={4} placeholder="Your Message" required></textarea>
                </div>
                <button type="submit" className="btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
