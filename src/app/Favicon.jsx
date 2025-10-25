"use client";

import { useEffect } from "react";

export default function Favicon({ url }) {
  useEffect(() => {
    if (!url) return;
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "icon";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
  }, [url]);

  return null;
}
