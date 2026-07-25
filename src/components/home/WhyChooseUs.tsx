import "../../styles/WhyChooseUs.css";

import {
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaTags,
} from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaTruck />,
      title: "Fast Delivery",
      desc: "Fast and secure delivery all over Egypt with reliable shipping.",
    },
    {
      icon: <FaShieldAlt />,
      title: "100% Genuine Products",
      desc: "Original printers, toners and inks from trusted brands with warranty.",
    },
    {
      icon: <FaTags />,
      title: "Best Prices",
      desc: "Competitive prices with exclusive offers for businesses and individuals.",
    },
    {
      icon: <FaHeadset />,
      title: "Professional Support",
      desc: "Our experts are ready to help you choose the right printer and cartridges.",
    },
  ];

  return (
    <section className="why">

      <div className="section-title">

        <span>WHY CHOOSE CROCODILE</span>

        <h2>Trusted Printing Solutions</h2>

        <p>
          Everything you need for your printing business in one place.
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