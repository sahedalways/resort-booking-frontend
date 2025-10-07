import Link from "next/link";

export default function Breadcrumb({ resort }) {
  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb custom-breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/resorts">Resorts</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/resorts/bangladesh">Bangladesh</Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              href={`/resorts/bangladesh/${
                resort.location?.toLowerCase() || "gazipur"
              }`}
            >
              {resort.location || "Gazipur"}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {resort.name}
          </li>
        </ol>
      </nav>
    </div>
  );
}
