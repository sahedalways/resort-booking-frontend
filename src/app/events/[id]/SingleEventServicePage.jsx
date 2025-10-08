"use client";

import Skeleton from "@/src/components/Skeleton";
import Image from "next/image";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import Contact from "../../contact/page";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import ImageGallery from "@/src/components/ImageGallery";

export default function SingleEventServicePage({ eventData }) {
  if (!eventData) return <Skeleton type="singleEvent" />;

  return (
    <>
      <section className="position-relative">
        {/* Header Section */}
        <div className="event-details-header mb-5">
          <div className="aboutus-overlay"></div>
          <div className="position-relative">
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
                  {eventData.title}
                  <span className=""></span>
                </h3>

                <div className="mt-4">
                  <h2 className="text-block-20">{eventData.title}</h2>
                  <p className="paragraph-sm fw-normal text-dark">
                    {eventData.description}
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
                src={eventData.thumbnail_url}
                alt={eventData.title}
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
              <ImageGallery images={eventData.images} />
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
