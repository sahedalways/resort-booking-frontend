"use client";

import { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import ImageSliderModal from "../../ImageSliderModal";
import Image from "next/image";
import {
  faCartPlus,
  faCheck,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addToCart, removeFromCart } from "@/src/redux/slices/cartSlice";
import { store } from "@/src/redux/store/store";
import { isLoggedIn } from "@/src/app/helper/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const RoomContent = ({ room, resortName }) => {
  const router = useRouter();
  const isLoggedInToken = isLoggedIn();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const cartItem = cart.items.find((item) => item.id === room.id);

  const handleCartToggle = () => {
    if (!isLoggedInToken) {
      toast.error("Please login to continue!");
      router.push("/auth/login");
      return;
    }

    if (cartItem) {
      toast.error(`${room.name} has been removed from your cart.`);
      dispatch(removeFromCart(room.id));
    } else {
      toast.success(`${room.name} has been added to your cart.`);
      dispatch(
        addToCart({
          resortId: room.resort_id,
          resortName: resortName,
          room: {
            id: room.id,
            name: room.name,
            price: room.price,
            adult_cap: room.adult_cap,
            child_cap: room.child_cap,
            is_daylong: room.is_daylong,
            images: room.images,
          },
        })
      );
    }
  };

  return (
    <>
      <div key={room.id} className="overview-content mb-4">
        <div className="row">
          <div className="col-xl-4 col-lg-5">
            <div className="card shadow border-0 overflow-hidden">
              <div className="p-3">
                <div className="main-img w-100 overflow-hidden rounded-3 mb-2">
                  <Image
                    width={300}
                    height={300}
                    src={room.images[0]}
                    alt={room.name}
                    className="w-100 h-100 object-fit-cover"
                    onClick={() => handleImageClick(0)}
                    style={{ cursor: "pointer" }}
                  />
                </div>

                <div className="row g-2">
                  {room.images.slice(1, 3).map((img, idx) => {
                    const imageIndex = idx + 1;
                    return (
                      <div key={idx} className="col-6">
                        <div className="thumb-img overflow-hidden rounded-3">
                          <Image
                            width={300}
                            height={300}
                            src={img}
                            alt={`${room.name} image ${imageIndex + 1}`}
                            onClick={() => handleImageClick(imageIndex)}
                            style={{ cursor: "pointer" }}
                            className="w-100 h-100 object-fit-cover"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-baseline mb-4">
                  <h2 className="text-block-20 mb-0">Room Specifications</h2>
                  <a
                    onClick={() => handleImageClick(0)}
                    style={{ cursor: "pointer" }}
                    className="primary-color text-block-14-fw-md text-decoration-none"
                  >
                    View Image
                  </a>
                </div>

                <div className="text-secondary">
                  <div className="spec-item mb-2">
                    <span className="text-block-14-fw-md gray-text">
                      Bed Type
                    </span>
                    <span className="text-muted">:</span>
                    <span className="text-block-14-fw-md gray-text">
                      {room.is_daylong
                        ? "N/A"
                        : room.bed_type?.type_name || "N/A"}
                    </span>
                  </div>

                  <div className="spec-item mb-2">
                    <span className="text-block-14-fw-md gray-text">
                      Capacity
                    </span>
                    <span className="text-muted">:</span>
                    <span className="text-block-14-fw-md gray-text">
                      {room.is_daylong
                        ? "0"
                        : `Adult x ${room.adult_cap || 0}, Child x ${
                            room.child_cap || 0
                          }`}
                    </span>
                  </div>

                  <div className="spec-item mb-2">
                    <span className="text-block-14-fw-md gray-text">
                      View Type
                    </span>
                    <span className="text-muted">:</span>
                    <span className="text-block-14-fw-md gray-text">
                      {room.is_daylong
                        ? "Full View"
                        : room.view_type?.type_name || "N/A"}
                    </span>
                  </div>

                  <div className="spec-item mb-2">
                    <span className="text-block-14-fw-md gray-text">Area</span>
                    <span className="text-muted">:</span>
                    <span className="text-block-14-fw-md gray-text">
                      {room.is_daylong ? "N/A" : `${room.area || "N/A"} sqm`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-8 col-lg-7">
            <div className="p-3">
              <h1 className="text-block-24 text-dark mb-3">
                {room.name} (
                {room.is_daylong
                  ? "Full View"
                  : room.view_type?.type_name || "N/A"}
                )
              </h1>

              <div
                className="d-flex flex-wrap gap-2 mb-4"
                id="amenity-chips-container"
              >
                {room.services.map((service, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1 amenity-chip text-sm rounded-3 fw-medium"
                  >
                    <i className={`${service.icon}`}></i>

                    {service.name}
                  </div>
                ))}
              </div>

              <div className="row">
                <div className="col-12 col-xl-6 col-lg-8">
                  <div className="bg-white rounded-3 shadow p-4 border border-light-subtle">
                    <div className="mb-3">
                      <h2 className="text-block-20 mb-2">
                        {room.package_name ?? "Option 1"}
                      </h2>
                      <p className="text-block-18-fw-light  d-inline-block me-2 mb-0">
                        <span className="secondary-color">
                          BDT {room.price ?? "N/A"}
                        </span>{" "}
                        {room.is_daylong ? "per person" : "per night/room"}
                      </p>

                      <p className="text-block-14-fw-md gray-text mt-1">
                        + taxes and fees apply
                      </p>
                    </div>

                    <hr className="my-3" />

                    <ul className="list-unstyled space-y-3 mb-3">
                      {room.rate_details.map((rate) => (
                        <li
                          key={rate.id}
                          className="d-flex align-items-start text-dark mb-2"
                        >
                          <span className="icon-size me-3 mt-1 text-success">
                            {rate.is_active ? (
                              <FontAwesomeIcon icon={faCheck} />
                            ) : (
                              <FontAwesomeIcon
                                icon={faXmark}
                                className="text-danger"
                              />
                            )}
                          </span>

                          <span className="text-block-16 fw-semibold gray-text">
                            {rate.title}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-block-16 gray-text mb-3 pt-2">
                      {room.desc ?? "N/A"}
                    </p>

                    <button
                      className="w-100 btn custom-btn-style fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2 text-block-14-fw-md"
                      onClick={handleCartToggle}
                      style={{
                        background: cartItem
                          ? "linear-gradient(90deg, #b71c1c, #f44336)"
                          : "linear-gradient(90deg, #0083bb, #164f84)",
                        border: "none",
                        color: "#fff",
                        position: "relative",
                      }}
                    >
                      <FontAwesomeIcon icon={cartItem ? faTrash : faCartPlus} />
                      {cartItem ? "Remove from Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ImageSliderModal
        images={room.images}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIndex={selectedIndex}
      />
    </>
  );
};

export default function Room({ room, resortName }) {
  return (
    <Provider store={store}>
      <RoomContent room={room} resortName={resortName} />
    </Provider>
  );
}
