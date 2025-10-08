// components/EventGallery.jsx
"use client";

import Image from "next/image";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

export default function ImageGallery({ images = [] }) {
  if (!images || images.length === 0) return null;

  return (
    <LightGallery
      showCloseIcon={true}
      speed={500}
      plugins={[lgThumbnail, lgZoom]}
      elementClassNames="row g-4"
    >
      {images.map((img, idx) => (
        <a href={img.image} className="col-md-3" key={idx}>
          <Image
            src={img.image}
            alt={img.alt || `Event Image ${idx + 1}`}
            width={500}
            height={500}
            className="img-fluid"
          />
        </a>
      ))}
    </LightGallery>
  );
}
