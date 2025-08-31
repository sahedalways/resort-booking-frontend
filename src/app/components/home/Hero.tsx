"use client";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="hero">
      <div className="container hero-content animated-hero-content">
        <div className="hero-left">
          <h1 data-aos="fade-right" data-aos-delay="400">
            Discover Your Perfect Getaway
          </h1>
          <p data-aos="fade-right" data-aos-delay="600">
            Experience luxury tours and resort stays tailored to your dreams. We
            create unforgettable memories in the world's most beautiful
            destinations.
          </p>
          <div
            className="hero-buttons"
            data-aos="fade-right"
            data-aos-delay="800"
          >
            <Link href="/tours" className="btn">
              Explore Tours
            </Link>
            <Link href="/resorts" className="btn btn-secondary">
              View Resorts
            </Link>
          </div>
        </div>

        <div className="hero-right" data-aos="fade-left">
          <div className="search-filter">
            <h3>Find Your Paradise</h3>
            <form className="filter-form">
              <div className="filter-group">
                <label htmlFor="search-destination">Destination</label>
                <select id="search-destination" required>
                  <option value="">Any Destination</option>
                  <option value="bali">Bali, Indonesia</option>
                  <option value="greece">Greek Islands</option>
                  <option value="maldives">Maldives</option>
                  <option value="switzerland">Swiss Alps</option>
                  <option value="safari">African Safari</option>
                  <option value="japan">Japan</option>
                  <option value="italy">Italy</option>
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="search-type">Experience Type</label>
                <select id="search-type" required>
                  <option value="">Any Experience</option>
                  <option value="tour">Tour Package</option>
                  <option value="resort">Resort Stay</option>
                  <option value="adventure">Adventure</option>
                  <option value="luxury">Luxury</option>
                  <option value="beach">Beach</option>
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="search-date">Travel Dates</label>
                <input
                  type="text"
                  id="search-date"
                  placeholder="Select Dates"
                  onFocus={(e) => (e.target.type = "date")}
                  required
                />
              </div>
              <div className="filter-group">
                <label htmlFor="search-guests">Travelers</label>
                <select id="search-guests" required defaultValue="2">
                  <option value="1">1 Traveler</option>
                  <option value="2">2 Travelers</option>
                  <option value="3">3 Travelers</option>
                  <option value="4">4 Travelers</option>
                  <option value="5+">5+ Travelers</option>
                </select>
              </div>
              <div className="filter-submit">
                <button type="submit">
                  <i className="fas fa-search"></i> Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
