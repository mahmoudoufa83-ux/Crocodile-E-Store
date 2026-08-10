import { useEffect } from "react";

import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Offers from "../components/home/Offers";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Brands from "../components/home/Brands";
import Testimonials from "../components/home/Testimonials";

function Home() {
  useEffect(() => {
    const sectionId =
      sessionStorage.getItem("scrollToSection");

    if (!sectionId) return;

    sessionStorage.removeItem("scrollToSection");

    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setTimeout(() => {
      const section =
        document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  }, []);

  return (
    <>
      {/* =========================
          HERO
      ========================== */}

      <Hero />

      {/* =========================
          CATEGORIES
      ========================== */}

      <Categories />

      {/* =========================
          FEATURED PRODUCTS
      ========================== */}

      <FeaturedProducts />

      {/* =========================
          OFFERS
      ========================== */}

      <Offers />

      {/* =========================
          WHY CHOOSE US
      ========================== */}

      <WhyChooseUs />

      {/* =========================
          BRANDS
      ========================== */}

      <Brands />

      {/* =========================
          TESTIMONIALS
      ========================== */}

      <Testimonials />
    </>
  );
}

export default Home;