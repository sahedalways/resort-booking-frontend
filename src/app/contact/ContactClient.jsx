"use client";

import ParallaxHero from "@/src/components/ParallaxHero";
import ContactForm from "@/src/components/ContactForm";
import { HeaderContext } from "../hooks/api/HeaderContext";
import { useContext } from "react";

const ContactClient = () => {
  const { headerData } = useContext(HeaderContext);

  const siteTitle = headerData?.header_info?.site_title || "BookingXpert";

  // 🧩 UI
  return (
    <>
      <ParallaxHero
        title="Contact Us"
        subtitle={`Reach out to ${siteTitle} — we’re here to help.`}
        image="/img/contact-hero.png"
      />

      <ContactForm />
    </>
  );
};

export default ContactClient;
