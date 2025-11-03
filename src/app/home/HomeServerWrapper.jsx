"use client";

import { HomeContext } from "../hooks/api/HomeContext";
import { useContext } from "react";
import Home from "./Home";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default async function HomeServerWrapper() {
  const { homeData, homeLoading } = useContext(HomeContext);

  if (homeLoading || !homeData) {
    return (
      <div className="container py-5">
        <Skeleton height={60} width={"50%"} />
        <Skeleton count={5} height={30} className="mt-2" />
        <div className="mt-5">
          <Skeleton height={300} />
        </div>
        <div className="mt-5">
          <Skeleton height={300} />
        </div>
      </div>
    );
  }

  return <Home homeData={homeData} />;
}
