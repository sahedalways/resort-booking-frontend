"use client";

import Skeleton from "@/src/components/Skeleton";
import Image from "next/image";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import ImageGallery from "@/src/components/ImageGallery";
import { EventContext } from "../../hooks/api/EventContext";
import { useContext, useEffect } from "react";
import EventContactForm from "@/src/components/EventContactForm";

export default function SingleEventServicePage({ id }) {
  const { fetchEventById, eventDetails, isEventLoading } =
    useContext(EventContext);

  useEffect(() => {
    fetchEventById(id).catch(console.error);
  }, [id, fetchEventById]);

  if (isEventLoading || !eventDetails) return <Skeleton type="singleEvent" />;

  return (
    <>
      <section className="position-relative">
        {/* Header Section */}
        <div className="event-details-header mb-5 position-relative">
          <div className="aboutus-overlay"></div>
          <div className="position-relative text-center text-white">
            <h1 className="text-block-50 fw-bold">Event Details</h1>
            <p className="text-block-20">
              Your trusted partner in planning the perfect escape.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div>
                <h3 className="text-block-32 position-relative underLine primary-color">
                  {eventDetails.title}
                  <span className=""></span>
                </h3>

                <div className="mt-4">
                  <h2 className="text-block-20">{eventDetails.title}</h2>
                  <p className="paragraph-sm fw-normal text-dark">
                    {eventDetails.description}
                  </p>
                </div>

                <div className="mt-4">
                  <h4 className="text-block-20">Our Services Include:</h4>
                  <ul className="list-unstyled">
                    <li className="mb-2 paragraph-sm text-dark">
                      <i className="bi bi-arrow-right-circle me-3 primary-color"></i>
                      Consultation and Planning
                    </li>
                    <li className="mb-2 paragraph-sm text-dark">
                      <i className="bi bi-arrow-right-circle me-3 primary-color"></i>
                      Design and Styling
                    </li>
                    <li className="mb-2 paragraph-sm text-dark">
                      <i className="bi bi-arrow-right-circle me-3 primary-color"></i>
                      Logistics and Coordination
                    </li>
                    <li className="mb-2 paragraph-sm text-dark">
                      <i className="bi bi-arrow-right-circle me-3 primary-color"></i>
                      Ceremony and Reception
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <Image
                src={eventDetails.thumbnail_url}
                alt={eventDetails.title}
                className="img-fluid"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-gap">
        <div className="container">
          <div className="row g-4">
            <div className="col">
              <div className="section-header-container">
                <h3 className="text-block-32 position-relative primary-color mb-0">
                  Flawless Wedding Planning for Your Dream Day
                </h3>
                <p className="subtitle text-dark">
                  We provide exceptional service to make your vacation perfect
                </p>
              </div>
            </div>

            <div className="col-12">
              <ImageGallery images={eventDetails.images} />
            </div>
          </div>
        </div>
      </section>

      <EventContactForm />
    </>
  );
}
