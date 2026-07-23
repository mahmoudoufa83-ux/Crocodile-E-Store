import "../../styles/Testimonials.css";

const testimonials = [
  {
    name: "Ahmed Mohamed",
    job: "Office Manager",
    review:
      "Excellent service and original products. Delivery was very fast and prices are competitive.",
  },
  {
    name: "Sara Ali",
    job: "Graphic Designer",
    review:
      "I've ordered printer supplies multiple times. Everything arrived in perfect condition.",
  },
  {
    name: "Mahmoud Hassan",
    job: "Company Owner",
    review:
      "The best office supplies store I've dealt with. Highly recommended.",
  },
];

function Testimonials() {
  return (
    <section className="testimonials">

      <div className="section-title">

        <span>TESTIMONIALS</span>

        <h2>What Our Customers Say</h2>

        <p>
          Trusted by hundreds of companies and individuals.
        </p>

      </div>

      <div className="testimonial-grid">

        {testimonials.map((item, index) => (

          <div className="testimonial-card" key={index}>

            <div className="stars">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="review">
              "{item.review}"
            </p>

            <h3>{item.name}</h3>

            <span>{item.job}</span>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Testimonials;