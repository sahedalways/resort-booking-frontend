const AboutUs = () => {
  return (
    <div className="container-fluid p-0">
      {/* Header Section */}
      <div className="aboutus-header mb-5">
        <div className="aboutus-overlay"></div>
        <div className="position-relative">
          <h1 className="text-block-50 fw-bold">About Us</h1>
          <p className="text-block-20">
            Your trusted partner in planning the perfect escape.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container">
        <p className="mb-4">
          BookingXpart is a leading platform helping you find and book the
          perfect <strong>resort and holiday solution</strong>. Our mission is
          to <strong>simplify travel</strong> with reliable and convenient
          booking services, backed by a commitment to quality and trust.
        </p>

        <p className="mb-4">
          We've built our reputation on <strong>trust</strong>, offering a
          platform where you can search, compare, and book everything from
          <strong> all-inclusive resorts</strong> to
          <strong> boutique retreats</strong>.
        </p>

        <p className="mb-5">
          Our mobile apps put a world of spectacular resorts at your fingertips.
          Whether for family trips, honeymoons, or custom holiday packages,
          BookingXpart makes it simple to book, manage, and enjoy your stay.
        </p>

        <h3 className="text-block-24 mb-3">
          ResortPay: Seamless and Secure Payments
        </h3>
        <p className="mb-5">
          <strong>ResortPay</strong> is our secure payment solution, making it
          easy to pay for bookings and extra services with confidence—all
          integrated within BookingXpart.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
