"use client";

import Image from "next/image";

export default function GlobalLoading() {
  return (
    <div className="full-page-loader d-flex flex-column align-items-center justify-content-center">
      <Image
        src="/Trail loading.gif"
        alt="Loading..."
        width={120}
        height={120}
        priority
        style={{
          objectFit: "contain",
          imageRendering: "high-quality",
        }}
      />
    </div>
  );
}
