import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Link from "next/link";
import Image from "next/image";

import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

const Slider = () => {
  // Move images to public/img folder
  const slides = [
    { img: "Bangkok.jpeg", title: "Bangkok" },
    { img: "Chennai.jpeg", title: "Chennai" },
    { img: "Kathamandu.jpeg", title: "Kathmandu" },
    { img: "Kuala_Lumpur.jpeg", title: "Kuala Lumpur" },
    { img: "Maafushi.jpeg", title: "Maafushi" },
    { img: "Singapore.jpeg", title: "Singapore" },
    { img: "Singapore.jpeg", title: "Singapore" },
    { img: "Singapore.jpeg", title: "Singapore" },
  ];

  return (
    <section className="slider-section section-gap">
      <div className="container">
        <div className="row">
          <div className="col">
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={1.5}
              spaceBetween={20}
              coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 50,
                modifier: 1,
                slideShadows: true,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1400: { slidesPerView: 5 },
              }}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="mySwiper"
            >
              {slides.map((item, index) => (
                <SwiperSlide key={index}>
                  <Link href="#">
                    <div className="slider-card">
                      <Image
                        src={`/img/${item.img}`} // correct path from public folder
                        alt={item.title}
                        className="slider-image"
                        width={100}
                        height={100}
                      />

                      <div className="slider-overlay">
                        <div className="slider-card-content">
                          <h3>{item.title}</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
