import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "@/src/components/Skeleton";

const Features = ({ featuresData }) => {
  if (!featuresData) return <Skeleton type="features" />;

  return (
    <section className="features-section section-gap">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="section-header-container">
              <div className="feature-pill">
                <span>Our Features</span>
              </div>

              <h1 className="main-title">Choose Your Priority</h1>

              <p className="subtitle">
                Our services are designed to cater to your specific needs and
                goals
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Resort Card */}
          <div className="col-12 col-md-6">
            <Link href="/resorts" style={{ textDecoration: "none" }}>
              <div className="card custom-overlay-card position-relative">
                <Image
                  src={featuresData?.resortImageUrl || "/img/resort_img.png"}
                  alt="Resort"
                  className="card-img-top card-img-top-fit w-100 h-auto"
                  width={600}
                  height={400}
                />
                <div className="custom-overlay">
                  <div className="overlay-content">
                    <h2 className="mb-2">Resort</h2>
                    <div className="rating-container">
                      {[...Array(4)].map((_, i) => (
                        <FontAwesomeIcon icon={faStar} key={i} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Event Card */}
          <div className="col-12 col-md-6">
            <Link href="/resorts" style={{ textDecoration: "none" }}>
              <div className="card custom-overlay-card position-relative">
                <Image
                  src={featuresData?.eventImageUrl || "/img/resort_img.png"}
                  alt="Event"
                  className="card-img-top card-img-top-fit w-100 h-auto"
                  width={600}
                  height={400}
                />
                <div className="custom-overlay">
                  <div className="overlay-content">
                    <h2 className="mb-2">Event</h2>
                    <div className="rating-container">
                      {[...Array(4)].map((_, i) => (
                        <FontAwesomeIcon icon={faStar} key={i} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
