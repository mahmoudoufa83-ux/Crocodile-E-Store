import { FaWhatsapp } from "react-icons/fa";
import { useStore } from "../../context/StoreContext";
import "../../styles/WhatsAppButton.css";

function WhatsAppButton() {
  const { settings } = useStore();

  if (!settings.whatsapp) return null;

  const phone = settings.whatsapp.replace(/\D/g, "");

  const message = encodeURIComponent(
    `Hello ${settings.storeName}, I'm interested in your products.`
  );

  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <span className="whatsapp-tooltip">
        Chat with us
      </span>

      <FaWhatsapp />
    </a>
  );
}

export default WhatsAppButton;