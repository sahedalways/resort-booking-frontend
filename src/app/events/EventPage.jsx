import Link from "next/link";
import Skeleton from "@/src/components/Skeleton";
import EventHero from "@/src/components/EventHero";
import EventServices from "@/src/components/EventServices";
import Contact from "../contact/page";
import ContactForm from "@/src/components/ContactForm";

export default function EventPage({ eventData }) {
  if (!eventData) return <Skeleton type="eventList" />;

  return (
    <>
      <EventHero eventData={eventData} />

      <EventServices eventData={eventData} />

      <section className="service-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="row g-4">
                <div className="col-6 col-md-4 text-center">
                  <div className="service-box">
                    <i className="bi bi-balloon-heart fs-2 secondary-color"></i>
                  </div>
                  <div className="service-text">Decorations</div>
                </div>
                <div className="col-6 col-md-4 text-center">
                  <div className="service-box">
                    <i className="bi bi-music-note-beamed fs-2 secondary-color"></i>
                  </div>
                  <div className="service-text">Entertainment Services</div>
                </div>
                <div className="col-6 col-md-4 text-center">
                  <div className="service-box">
                    <i className="bi bi-brush fs-2 secondary-color"></i>
                  </div>
                  <div className="service-text">Creative Services</div>
                </div>
                <div className="col-6 col-md-4 text-center">
                  <div className="service-box">
                    <i className="bi bi-gift fs-2 secondary-color"></i>
                  </div>
                  <div className="service-text">Travel & Transportation</div>
                </div>
                <div className="col-6 col-md-4 text-center">
                  <div className="service-box">
                    <i className="bi bi-person-workspace fs-2 secondary-color"></i>
                  </div>
                  <div className="service-text">Planning & Designing</div>
                </div>
                <div className="col-6 col-md-4 text-center">
                  <div className="service-box">
                    <i className="bi bi-cup-straw fs-2 secondary-color"></i>
                  </div>
                  <div className="service-text">Food and Catering</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 text-center text-lg-start mt-5 mt-lg-0">
              <h2 className="main-title">
                What we <br className="d-lg-block d-none" /> offer
              </h2>
            </div>
          </div>
        </div>
      </section>
      <ContactForm />
    </>
  );
}
