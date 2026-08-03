import "../../styles/Testimonials.css";

import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase";

type Review = {
  id: string;
  name: string;
  job: string;
  review: string;
  rating: number;
  approved: boolean;
};

function Testimonials() {

  const [reviews, setReviews] = useState<Review[]>([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");

  const [job, setJob] = useState("");

  const [review, setReview] = useState("");

  const [rating, setRating] = useState(5);

  async function loadReviews() {

    try {

      const q = query(
        collection(db, "reviews"),
        where("approved", "==", true),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Review, "id">),
      }));

      setReviews(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadReviews();

  }, []);

  async function submitReview() {

    if (
      !name.trim() ||
      !job.trim() ||
      !review.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {

      await addDoc(
        collection(db, "reviews"),
        {
          name,
          job,
          review,
          rating,
          approved: false,
          createdAt: serverTimestamp(),
        }
      );

      alert(
        "Thank you! Your review has been submitted and is awaiting admin approval."
      );

      setName("");
      setJob("");
      setReview("");
      setRating(5);

      setShowForm(false);

      loadReviews();

    } catch (error) {

      console.error(error);

      alert("Failed to submit review.");

    }

  }

  return (

    <section className="testimonials">

      <div className="section-title">

        <span>TESTIMONIALS</span>

        <h2>What Our Customers Say</h2>

        <p>
          Trusted by hundreds of companies and individuals.
        </p>

      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >

        <button
          className="write-review-btn"
          onClick={() =>
            setShowForm(!showForm)
          }
        >

          Write a Review

        </button>

      </div>

      {showForm && (

        <div className="review-form">

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Your Job"
            value={job}
            onChange={(e) =>
              setJob(e.target.value)
            }
          />

          <textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) =>
              setReview(e.target.value)
            }
          />

          <select
            value={rating}
            onChange={(e) =>
              setRating(Number(e.target.value))
            }
          >

            <option value={5}>⭐⭐⭐⭐⭐</option>

            <option value={4}>⭐⭐⭐⭐</option>

            <option value={3}>⭐⭐⭐</option>

            <option value={2}>⭐⭐</option>

            <option value={1}>⭐</option>

          </select>

          <button
            className="submit-review"
            onClick={submitReview}
          >

            Submit Review

          </button>

        </div>

      )}

      <div className="testimonial-grid">        {loading ? (

          <p>Loading...</p>

        ) : reviews.length === 0 ? (

          <p>
            No approved reviews yet.
          </p>

        ) : (

          reviews.map((item) => (

            <div
              className="testimonial-card"
              key={item.id}
            >

              <div className="stars">
                {"⭐".repeat(item.rating)}
              </div>

              <p className="review">
                "{item.review}"
              </p>

              <h3>
                {item.name}
              </h3>

              <span>
                {item.job}
              </span>

            </div>

          ))

        )}

      </div>

    </section>

  );

}

export default Testimonials;