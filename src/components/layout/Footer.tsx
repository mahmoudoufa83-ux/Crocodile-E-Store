import "../../styles/Footer.css";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { useStore } from "../../context/StoreContext";

function Footer() {

  const { settings } = useStore();

  return (

    <footer className="footer">

      <div className="footer-container">

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

          <div className="socials">

            {settings.facebook && (

              <a
                href={settings.facebook}
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF />
              </a>

            )}

            {settings.instagram && (

              <a
                href={settings.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>

            )}

            <a href="#">

              <FaLinkedinIn />

            </a>

          </div>

        </div>

        <div className="footer-col">

          <h3>Quick Links</h3>

          <ul>

            <li><a href="/">Home</a></li>

            <li><a href="/products">Products</a></li>

            <li><a href="/">Categories</a></li>

            <li><a href="/">About</a></li>

            <li><a href="/">Contact</a></li>

          </ul>

        </div>

        <div className="footer-col">

          <h3>Customer Service</h3>

          <ul>

            <li><a href="#">Shipping</a></li>

            <li><a href="#">Returns</a></li>

            <li><a href="#">Privacy Policy</a></li>

            <li><a href="#">Terms & Conditions</a></li>

          </ul>

        </div>

        <div className="footer-col">

          <h3>Contact</h3>

          <p>

            <FaPhoneAlt />

            {" "}

            {settings.phone || "+20 100 000 0000"}

          </p>

          <p>

            <FaEnvelope />

            {" "}

            {settings.adminEmail}

          </p>

          <p>

            <FaMapMarkerAlt />

            {" "}

            {settings.address || "Cairo, Egypt"}

          </p>

          {settings.whatsapp && (

            <p>

              WhatsApp :

              {" "}

              {settings.whatsapp}

            </p>

          )}

        </div>

      </div>

      <div className="footer-bottom">

        © {new Date().getFullYear()} {settings.storeName}. All Rights Reserved.

      </div>

    </footer>

  );

}

export default Footer;