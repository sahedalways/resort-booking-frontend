"use client";

import { useSearchParams } from "next/navigation";
import SingleResortInfo from "../[id]/SingleResortInfo";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const resultsParam = searchParams.get("results");
  const searchResults = resultsParam ? JSON.parse(resultsParam) : null;

  return (
    <div className="search-page">
      <div className="search-results mt-5">
        <SingleResortInfo resortData={searchResults} />
      </div>
    </div>
  );
};

export default SearchPage;
