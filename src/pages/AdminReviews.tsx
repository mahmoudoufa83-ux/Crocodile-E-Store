import "../styles/AdminProducts.css";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import {
  useEffect,
  useState,
} from "react";

import { db } from "../firebase";

type Review = {
  id: string;
  name: string;
  job: string;
  review: string;
  rating: number;
  approved: boolean;
};

function AdminReviews() {
  const [reviews, setReviews] =
    useState<Review[]>([]);

  async function loadReviews() {
    const snapshot = await getDocs(
      collection(db, "reviews")
    );

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<
        Review,
        "id"
      >),
    }));

    setReviews(data);
  }

  useEffect(() => {
    loadReviews();
  }, []);

  async function approveReview(
    id: string
  ) {
    await updateDoc(
      doc(db, "reviews", id),
      {
        approved: true,
      }
    );

    loadReviews();
  }

  async function deleteReview(
    id: string
  ) {
    const ok = window.confirm(
      "Delete this review?"
    );

    if (!ok) return;

    await deleteDoc(
      doc(db, "reviews", id)
    );

    loadReviews();
  }

  return (
    <section className="admin-products">

      <div className="admin-header">

        <h1>Reviews Management</h1>

        <p>Approve or Delete Reviews</p>

      </div>

      <table className="products-table">

        <thead>

          <tr>

            <th>Name</th>

            <th>Job</th>

            <th>Rating</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {reviews.length === 0 ? (

            <tr>

              <td
                colSpan={5}
                style={{
                  textAlign: "center",
                }}
              >
                No Reviews Found
              </td>

            </tr>

          ) : (

            reviews.map((review) => (

              <tr key={review.id}>

                <td>{review.name}</td>

                <td>{review.job}</td>

                <td>
                  {"⭐".repeat(review.rating)}
                </td>

                <td>

                  {review.approved ? (

                    <span
                      style={{
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      Approved
                    </span>

                  ) : (

                    <span
                      style={{
                        color: "orange",
                        fontWeight: "bold",
                      }}
                    >
                      Pending
                    </span>

                  )}

                </td>

                <td
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >

                  {!review.approved && (

                    <button
                      onClick={() =>
                        approveReview(review.id)
                      }
                    >
                      Approve
                    </button>

                  )}

                  <button
                    onClick={() =>
                      deleteReview(review.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </section>
  );
}

export default AdminReviews;