"use client";
import ResortSkeleton from "@/src/components/ResortSkeleton";

import ResortInfo from "@/src/components/SingleResort/ResortInfo";
import ResortGallery from "@/src/components/SingleResort/ResortGallery";
import ResortDescription from "@/src/components/SingleResort/ResortDescription";
import ResortFacilities from "@/src/components/SingleResort/ResortFacilities";
import ResortTimings from "@/src/components/SingleResort/ResortTimings";
import Breadcrumb from "@/src/components/SingleResort/Breadcrumb";
import ResortPolicyTable from "@/src/components/SingleResort/ResortPolicyTable";
import ResortBelowTabs from "@/src/components/SingleResort/ResortBelowTabs";

const SingleResortInfo = ({ resortData }) => {
  const resort = resortData;
  const location = resort.location;
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    location
  )}&output=embed`;

  if (!resortData) return <ResortSkeleton type="resorts" />;

  return (
    <div className="resort-details">
      <div className="breadcrumb-container">
        <Breadcrumb resort={resort} />
      </div>

      <ResortInfo resort={resort} />

      {/* Gallery */}
      <ResortGallery resort={resort} />



      {/* Facilities */}
      {resort?.facilities?.length > 0 && (
        <ResortFacilities facilities={resort.facilities} />
      )}

      <ResortPolicyTable resort={resortData} sectionTitle="Resort Policy" />

      {/* Night & Day Stay */}
      <ResortTimings resort={resort} />

      <ResortBelowTabs resortData={resortData} mapUrl={mapUrl} />
    </div>
  );
};

export default SingleResortInfo;
