import formatTime12Hour from "@/src/app/utils/TimeConverter";
import Image from "next/image";

const ResortPolicyTable = ({ resort, sectionTitle }) => {
  if (!resort) return null;

  return (
    <section className="section-gap-sm">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-block-20 primary-color mb-3">{sectionTitle}</h2>
          </div>

          <div className="col-12">
            <div className="table-responsive shadow-sm">
              <table className="table mb-0 table-bordered custom-table-style">
                <tbody>
                  {/* Day Check-in */}
                  <tr>
                    <td className="fw-semibold bg-light text-dark col-lg-3 col-md-4 col-6 p-3">
                      <i className="bi bi-box-arrow-in-right me-2"></i> Day
                      Check-in
                    </td>
                    <td className="col-lg-9 col-md-8 col-6 p-3 gray-text">
                      {formatTime12Hour(resort.d_check_in) || "N/A"}
                    </td>
                  </tr>

                  {/* Day Check-out */}
                  <tr>
                    <td className="fw-semibold bg-light text-dark p-3">
                      <i className="bi bi-box-arrow-left me-2"></i> Day
                      Check-out
                    </td>
                    <td className="p-3 gray-text">
                      {formatTime12Hour(resort.d_check_out) || "N/A"}
                    </td>
                  </tr>

                  {/* Night Check-in */}
                  <tr>
                    <td className="fw-semibold bg-light text-dark p-3">
                      <i className="bi bi-box-arrow-in-right me-2"></i> Night
                      Check-in
                    </td>
                    <td className="p-3 gray-text">
                      {formatTime12Hour(resort.n_check_in) || "N/A"}
                    </td>
                  </tr>

                  {/* Night Check-out */}
                  <tr>
                    <td className="fw-semibold bg-light text-dark p-3">
                      <i className="bi bi-box-arrow-left me-2"></i> Night
                      Check-out
                    </td>
                    <td className="p-3 gray-text">
                      {formatTime12Hour(resort.n_check_out) || "N/A"}
                    </td>
                  </tr>

                  {/* Additional Facts */}
                  <tr>
                    <td className="fw-semibold bg-light text-dark align-top p-3">
                      <i className="bi bi-info-circle me-2"></i> Additional
                      Facts
                    </td>
                    <td className="p-3">
                      <ul className="mb-0 ps-3 gray-text d-grid gap-2">
                        {resort.additional_facts &&
                          resort.additional_facts.map((fact) => (
                            <li key={fact.id}>{fact.name}</li>
                          ))}
                      </ul>
                    </td>
                  </tr>

                  {/* Payment Accepted */}
                  <tr>
                    <td className="fw-semibold bg-light text-dark align-top p-3">
                      <i className="bi bi-credit-card me-2"></i> Payment
                      accepted
                    </td>
                    <td className="p-3">
                      <Image
                        width={80}
                        height={40}
                        src="/img/bkash.png"
                        alt="Bkash"
                        className="payment-icon-table w-auto m-1"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResortPolicyTable;
