import "../../styles/WhyChooseUs.css";

import {
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaUndoAlt,
} from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaTruck />,
      title: "Fast Delivery",
      desc: "We deliver your orders quickly anywhere in Egypt.",
    },
    {
      icon: <FaShieldAlt />,
      title: "100% Original",
      desc: "All products are genuine with official warranty.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Our team is always ready to help you anytime.",
    },
    {
      icon: <FaUndoAlt />,
      title: "Easy Returns",
      desc: "Simple and hassle-free return policy.",
    },
  ];

  return (
    <section className="why">

      <div className="section-title">

        <span>WHY CHOOSE US</span>

        <h2>Why Shop With Crocodile?</h2>

        <p>
          We provide everything you need for your office with
          premium quality and excellent service.
        </p>

      </div>

      <div className="why-grid">

        {features.map((item, index) => (

          <div className="why-card" key={index}>

            <div className="why-icon">

              {item.icon}

            </div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default WhyChooseUs;