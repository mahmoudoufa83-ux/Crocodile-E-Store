import "../../styles/Footer.css";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaDirections,
} from "react-icons/fa";

import { useStore } from "../../context/StoreContext";

function Footer() {
  const { settings } = useStore();

  const googleMapsUrl =
    "https://goo.gl/maps/p5ocqjCqVuPh6tpb7";

  return (
    <footer className="footer" id="contact">
      <div className="footer-container">

        {/* =========================
            STORE INFORMATION
        ========================== */}

        <div className="footer-col">

          {settings.logo ? (
            <img
              src={settings.logo}
              alt="Logo"
              style={{
                width: "70px",
                height: "70px",
                objectFit: "cover",
                borderRadius: "50%",
                marginBottom: "15px",
              }}
            />
          ) : null}

          <h2>{settings.storeName}</h2>

          <p>
            Original printers, cartridges,
            toners and office supplies.
          </p>

          {/* =========================
              SOCIAL MEDIA
          ========================== */}

          <div className="socials">

            {settings.facebook && (
              <a
                href={settings.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
            )}

            {settings.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            )}

            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>

          </div>
        </div>

        {/* =========================
            QUICK LINKS
        ========================== */}

        <div className="footer-col">

          <h3>Quick Links</h3>

          <ul>

            <li>
              <a href="/">Home</a>
            </li>

            <li>
              <a href="/products">Products</a>
            </li>

            <li>
              <a href="/">Categories</a>
            </li>

            <li>
              <a href="/">About</a>
            </li>

            <li>
              <a href="/#contact">Contact</a>
            </li>

          </ul>
        </div>

        {/* =========================
            CUSTOMER SERVICE
        ========================== */}

        <div className="footer-col">

          <h3>Customer Service</h3>

          <ul>

            <li>
              <a href="/returns">
                Returns & Refunds
              </a>
            </li>

            <li>
              <a href="/terms">
                Terms & Conditions
              </a>
            </li>

            <li>
              <a href="#">Privacy Policy</a>
            </li>

            <li>
              <a href="#">Shipping</a>
            </li>

          </ul>
        </div>

        {/* =========================
            CONTACT
        ========================== */}

        <div className="footer-col">

          <h3>Contact</h3>

          <p>
            <FaPhoneAlt />{" "}
            {settings.phone || "+20 100 000 0000"}
          </p>

          <p>
            <FaEnvelope />{" "}
            {settings.adminEmail}
          </p>

          <div className="footer-location">

            <p className="location-text">
              <FaMapMarkerAlt />
              <span>
                {settings.address || "Cairo, Egypt"}
              </span>
            </p>

            <a
              className="directions-btn"
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Get Directions to our location"
            >
              <FaDirections />
              <span>Get Directions</span>
            </a>

          </div>

          {settings.whatsapp && (
            <p>
              WhatsApp :{" "}
              {settings.whatsapp}
            </p>
          )}

        </div>

      </div>

      {/* =========================
          FOOTER BOTTOM
      ========================== */}

      <div className="footer-bottom">
        © {new Date().getFullYear()}{" "}
        {settings.storeName}. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;