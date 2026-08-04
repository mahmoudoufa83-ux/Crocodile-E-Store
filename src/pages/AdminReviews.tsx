import "../styles/AdminProducts.css";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

import {
  useEffect,
  useMemo,
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
  createdAt?: any;
};

function AdminReviews() {
  const [reviews, setReviews] =
    useState<Review[]>([]);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState<
      "all" | "approved" | "pending"
    >("all");

  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe =
      onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<
              Review,
              "id"
            >),
          })
        );

        setReviews(data);
      });

    return () => unsubscribe();
  }, []);

  const filteredReviews =
    useMemo(() => {
      return reviews.filter((review) => {
        const matchesSearch =
          review.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesFilter =
          filter === "all"
            ? true
            : filter === "approved"
            ? review.approved
            : !review.approved;

        return (
          matchesSearch &&
          matchesFilter
        );
      });
    }, [reviews, search, filter]);

  async function approveReview(
    id: string
  ) {
    await updateDoc(
      doc(db, "reviews", id),
      {
        approved: true,
      }
    );
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
  }

  return (
    <section className="admin-products">

      <div className="admin-header">

        <h1>
          Reviews Management
        </h1>

        <p>
          Approve or Delete Reviews
        </p>

      </div>

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          gap: "20px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >

        <input
          type="text"
          placeholder="Search by customer..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            padding: "12px",
            width: "280px",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value as
                | "all"
                | "approved"
                | "pending"
            )
          }
          style={{
            padding: "12px",
            borderRadius: "10px",
          }}
        >
          <option value="all">
            All Reviews
          </option>

          <option value="approved">
            Approved
          </option>

          <option value="pending">
            Pending
          </option>
        </select>

      </div>

      <table className="products-table">

        <thead>

          <tr>

            <th>Name</th>

            <th>Job</th>

            <th>Review</th>

            <th>Rating</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>          {filteredReviews.length === 0 ? (

            <tr>

              <td
                colSpan={6}
                style={{
                  textAlign: "center",
                  padding: "30px",
                }}
              >
                No Reviews Found
              </td>

            </tr>

          ) : (

            filteredReviews.map((review) => (

              <tr key={review.id}>

                <td>{review.name}</td>

                <td>{review.job}</td>

                <td
                  style={{
                    maxWidth: "350px",
                    lineHeight: "1.6",
                  }}
                >
                  {review.review}
                </td>

                <td>
                  {"⭐".repeat(review.rating)}
                </td>

                <td>

                  {review.approved ? (

                    <span
                      style={{
                        color: "#16A34A",
                        fontWeight: "bold",
                      }}
                    >
                      Approved
                    </span>

                  ) : (

                    <span
                      style={{
                        color: "#F59E0B",
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
                      ✅ Approve
                    </button>

                  )}

                  <button
                    onClick={() =>
                      deleteReview(review.id)
                    }
                  >
                    🗑 Delete
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