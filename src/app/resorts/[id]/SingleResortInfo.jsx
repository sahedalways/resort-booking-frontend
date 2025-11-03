"use client";
import ResortSkeleton from "@/src/components/ResortSkeleton";

import ResortInfo from "@/src/components/SingleResort/ResortInfo";
import ResortGallery from "@/src/components/SingleResort/ResortGallery";
import ResortDescription from "@/src/components/SingleResort/ResortDescription";
import ResortFacilities from "@/src/components/SingleResort/ResortFacilities";
import ResortTimings from "@/src/components/SingleResort/ResortTimings";
import Breadcrumb from "@/src/components/SingleResort/Breadcrumb";
import ResortBelowTabs from "@/src/components/SingleResort/ResortBelowTabs";
import { ResortContext } from "../../hooks/api/ResortContext";
import { useContext, useEffect } from "react";

const SingleResortInfo = ({ id }) => {
  const { fetchResortById, isResortLoading, resortDetails } =
    useContext(ResortContext);

  useEffect(() => {
    fetchResortById(id);
  }, [id]);

  if (isResortLoading || !resortDetails) {
    return <ResortSkeleton type="resorts" />;
  }

  // ✅ Safe to access properties now
  const location = resortDetails.location;
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    location
  )}&output=embed`;

  return (
    <div className="resort-details">
      <div className="breadcrumb-container">
        <Breadcrumb resort={resortDetails} />
      </div>

      <ResortInfo resort={resortDetails} />

      {/* Gallery */}
      <ResortGallery resort={resortDetails} />

      <ResortDescription resort={resortDetails} mapUrl={mapUrl} />

      {/* Facilities */}
      {resortDetails?.facilities?.length > 0 && (
        <ResortFacilities facilities={resortDetails.facilities} />
      )}

      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <h3 className="text-block-20 primary-color mt-4">Resort Policy</h3>
          </div>
        </div>
      </div>

      {/* Night & Day Stay */}
      <ResortTimings resort={resortDetails} />

      {resortDetails && (
        <ResortBelowTabs resortData={resortDetails} mapUrl={mapUrl} id={id} />
      )}
    </div>
  );
};

export default SingleResortInfo;
