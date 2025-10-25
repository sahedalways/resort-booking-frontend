"use client";

import ParallaxHero from "@/src/components/ParallaxHero";
import { useSiteData } from "../hooks/SiteDataContext";
import ContactForm from "@/src/components/ContactForm";

const ContactClient = () => {
  const { headerData, footerData } = useSiteData();

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
