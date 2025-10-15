import { isLoggedIn } from "@/src/app/helper/auth";
import { ResortContext } from "@/src/app/hooks/api/ResortContext";
import { LocalStoreContext } from "@/src/app/hooks/localstorage/LocalStoreContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

const Review = ({ resortData, sectionTitle, reviews, setReviews }) => {
  const { saveReview, isLoadingSubmitting, deleteReview, updateReview } =
    useContext(ResortContext);
  const isLoggedInToken = isLoggedIn();
  const { authUserData } = useContext(LocalStoreContext);
  const [showFull, setShowFull] = useState({});
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [editReview, setEditReview] = useState({ rating: 0, comment: "" });

  const handleSubmitReview = async () => {
    if (!newReview.rating || !newReview.comment) {
      toast.error("Please provide rating and comment", {
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    const success = await saveReview(newReview, resortData.id);

    if (success) {
      const newReviewObj = {
        id: Date.now(),
        user: {
          f_name: authUserData?.f_name,
          l_name: authUserData?.l_name,
        },
        user_id: authUserData?.id,
        star: newReview.rating,
        comment: newReview.comment,
        created_at: new Date().toISOString(),
      };

      setReviews([newReviewObj, ...reviews]);
      setNewReview({ rating: 0, comment: "" });
    }
  };

  const handleDelete = async (reviewId) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    const success = await deleteReview(reviewId);
    if (success) {
      setReviews(reviews.filter((r) => r.id !== reviewId));
    }
  };

  const handleEdit = (review) => {
    setEditingReviewId(review.id);
    setEditReview({ rating: review.star, comment: review.comment });
  };

  const handleUpdate = async () => {
    if (!editReview.rating || !editReview.comment) {
      toast.error("Please provide rating and comment", {
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    const updatedReview = await updateReview(editReview, editingReviewId);
    if (updatedReview) {
      setReviews(
        reviews.map((r) =>
          r.id === editingReviewId
            ? {
                ...r,
                star: updatedReview.star,
                comment: updatedReview.comment,
              }
            : r
        )
      );
      setEditingReviewId(null);
      setEditReview({ rating: 0, comment: "" });
    }
  };

  return (
    <div className="reviews-section section-gap-sm">
      <div className="col-12">
        <h2 className="text-block-20 primary-color mb-3">{sectionTitle}</h2>
      </div>

      {reviews?.length > 0 ? (
        reviews.map((review) => {
          const maxLength = 150;
          const isLong = review.comment.length > maxLength;
          const displayedComment =
            showFull[review.id] || editingReviewId === review.id
              ? review.comment
              : review.comment.substring(0, maxLength);

          const isCurrentUser =
            review.user.f_name === authUserData?.f_name &&
            review.user.l_name === authUserData?.l_name;

          return (
            <div
              key={review.id}
              className="review-card mb-3 p-3 rounded shadow-sm border-0"
            >
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div>
                  <strong className="review-user">
                    {review.user.f_name} {review.user.l_name}
                  </strong>
                  <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                    {new Date(review.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="review-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${star <= review.star ? "checked" : ""}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {editingReviewId === review.id ? (
                <div className="mb-2">
                  <div className="rating-stars mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${
                          star <= editReview.rating ? "checked" : ""
                        }`}
                        onClick={() =>
                          setEditReview({ ...editReview, rating: star })
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <textarea
                    className="form-control mb-2"
                    rows={3}
                    value={editReview.comment}
                    onChange={(e) =>
                      setEditReview({ ...editReview, comment: e.target.value })
                    }
                  />
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditingReviewId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p className="review-comment mt-3 mb-4">
                  {displayedComment}
                  {isLong && (
                    <span
                      className="text-primary ms-1 cursor-pointer"
                      onClick={() =>
                        setShowFull({
                          ...showFull,
                          [review.id]: !showFull[review.id],
                        })
                      }
                    >
                      {showFull[review.id] ? "See less" : "See more"}
                    </span>
                  )}
                </p>
              )}

              {authUserData?.id === review.user_id && (
                <div className="d-flex gap-2 mt-2">
                  {editingReviewId !== review.id && (
                    <>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(review)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(review.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-muted">No reviews yet.</p>
      )}

      {/* Submit review form */}
      {isLoggedInToken && (
        <>
          {editingReviewId === null && (
            <div className="mt-4 review-form">
              <h5 className="mb-3">Leave a Review</h5>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitReview();
                }}
              >
                {/* Rating stars */}
                <div className="mb-3">
                  <label className="form-label">Rating:</label>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${
                          star <= newReview.rating ? "checked" : ""
                        }`}
                        onClick={() =>
                          setNewReview({ ...newReview, rating: star })
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div className="mb-3 mt-5">
                  <label htmlFor="reviewComment" className="form-label">
                    Comment:
                  </label>
                  <textarea
                    id="reviewComment"
                    className="form-control shadow-none"
                    rows={3}
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    placeholder="Write your review..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoadingSubmitting}
                >
                  {isLoadingSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </form>
            </div>
          )}
        </>
      )}

      <style jsx>{`
        .review-card {
          background-color: #f8f9fa;
          border-left: 4px solid var(--secondary);
        }

        .review-user {
          color: var(--primary-deep);
        }

        .review-stars .star {
          font-size: 1.2rem;
          color: #ccc;
          margin-left: 2px;
        }

        .review-stars .star.checked {
          color: var(--secondary-deep);
        }

        .rating-stars .star {
          font-size: 1.5rem;
          color: #ccc;
          cursor: pointer;
          margin-right: 5px;
          transition: color 0.2s;
        }

        .rating-stars .star.checked {
          color: var(--secondary-deep);
        }

        .review-comment {
          font-size: 0.95rem;
          color: #333;
        }

        .review-form .btn-primary {
          background-color: var(--secondary);
          border-color: var(--secondary-deep);
        }

        .review-form .btn-primary:hover {
          background-color: var(--secondary-deep);
          border-color: var(--primary-deep);
        }
      `}</style>
    </div>
  );
};

export default Review;
