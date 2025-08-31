"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonials = () => {
  const testimonials = [
    {
      text: "Prokiti-Bari planned our honeymoon to perfection! Every detail was taken care of, from airport transfers to special romantic dinners. The resort they recommended was beyond our expectations.",
      img: "https://randomuser.me/api/portraits/women/32.jpg",
      name: "Sarah Johnson",
      trip: "Honeymoon in Bali",
    },
    {
      text: "Amazing service! Our family trip was so smooth and comfortable. Highly recommend Prokiti-Bari for stress-free travel planning.",
      img: "https://randomuser.me/api/portraits/men/44.jpg",
      name: "Michael Smith",
      trip: "Family Trip to Thailand",
    },
    {
      text: "Best solo travel experience ever. They handled everything, so I could just enjoy and explore. Definitely booking again.",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      name: "Emily Davis",
      trip: "Solo Trip to Nepal",
    },
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <h2>What Our Guests Say</h2>
          <p>Hear from travelers who have experienced our services</p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          navigation={false}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="testimonials-container"
          data-aos="fade-up"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="testimonial-card">
                <div className="testimonial-content">"{t.text}"</div>
                <div className="testimonial-author">
                  <div className="author-img">
                    <img src={t.img} alt={t.name} />
                  </div>
                  <div className="author-info">
                    <h4>{t.name}</h4>
                    <p>{t.trip}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
