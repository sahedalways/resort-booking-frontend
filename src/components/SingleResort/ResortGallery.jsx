import Image from "next/image";
import { useState } from "react";
import ImageSliderModal from "../ImageSliderModal";

export default function ResortGallery({ resort }) {
  if (!resort.images || resort.images.length === 0) return null;

  const mainImage = resort.images[0];
  const sideImages = resort.images.slice(1, 5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="gallery-container">
              <div className="main-photo">
                <Image
                  width={800}
                  height={400}
                  src={mainImage}
                  alt={resort.name}
                  onClick={() => handleImageClick(0)}
                  style={{ cursor: "pointer" }}
                />
              </div>

              <div className="side-photos">
                {sideImages.map((img, idx) => {
                  const imageIndex = idx + 1;
                  return (
                    <div key={idx} className="side-photo-item">
                      <Image
                        width={800}
                        height={400}
                        src={img}
                        alt={resort.name}
                        onClick={() => handleImageClick(imageIndex)}
                        style={{ cursor: "pointer", position: "relative" }}
                      />
                      {idx === sideImages.length - 1 &&
                        resort.images.length > 4 && (
                          <div
                            className="overlay"
                            onClick={() => setIsModalOpen(true)}
                            style={{ cursor: "pointer" }}
                          >
                            Show all {resort.images.length} photos
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ImageSliderModal
        images={resort.images}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIndex={selectedIndex}
      />
    </section>
  );
}
