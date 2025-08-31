
"use client";

const Booking = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thank you for your booking request! Our team will contact you shortly to confirm your reservation.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="booking" >
      <div className="container">
        <div className="section-title">
          <h2>Plan Your Dream Vacation</h2>        
          </div>
        <div className="booking-form" data-aos="fade-up">
          <form id="bookingForm" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="destination">Destination</label>
                <select id="destination" required>
                  <option value="">Select Destination</option>
                  <option value="bali">Bali, Indonesia</option>
                  <option value="greece">Greek Islands</option>
                  <option value="maldives">Maldives</option>
                  <option value="switzerland">Swiss Alps</option>
                  <option value="safari">African Safari</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="tourType">Tour Type</label>
                <select id="tourType" required>
                  <option value="">Select Tour Type</option>
                  <option value="adventure">Adventure</option>
                  <option value="luxury">Luxury</option>
                  <option value="cultural">Cultural</option>
                  <option value="beach">Beach</option>
                  <option value="wildlife">Wildlife</option>
                </select>
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="checkIn">Check In</label>
                <input type="date" id="checkIn" required />
              </div>
              <div className="form-group">
                <label htmlFor="checkOut">Check Out</label>
                <input type="date" id="checkOut" required />
              </div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label htmlFor="guests">Guests</label>
                <select id="guests" required >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5+">5+ Guests</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="specialRequests">Special Requests</label>
              <textarea id="specialRequests" rows={3} placeholder="Tell us about your preferences or special requirements"></textarea>
            </div>
            <div className="form-submit">
              <button type="submit" className="btn btn-accent">Submit Booking Request</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Booking;
