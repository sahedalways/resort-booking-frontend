import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Link from "next/link";
import Image from "next/image";

import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import Skeleton from "@/src/components/Skeleton";

const Slider = ({ resortData }) => {
  if (!resortData) return <Skeleton type="slider" />;

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
              {resortData.map((item, index) => (
                <SwiperSlide key={index}>
                  <Link href={`/resorts/${item.id}`}>
                    <div className="slider-card">
                      <Image
                        src={
                          item.images?.[0]?.image || "/img/default-resort.jpg"
                        }
                        alt={item.name}
                        className="slider-image"
                        width={100}
                        height={100}
                      />

                      <div className="slider-overlay">
                        <div className="slider-card-content">
                          <h3>{item.name}</h3>
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
