import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const key = `scroll-${location.pathname}`;

    if (navigationType === "POP") {
      const saved = sessionStorage.getItem(key);

      if (saved) {
        window.scrollTo({
          top: Number(saved),
          behavior: "auto",
        });
        return;
      }
    }

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });

  }, [location.pathname, navigationType]);

  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem(
        `scroll-${location.pathname}`,
        window.scrollY.toString()
      );
    };

    window.addEventListener("scroll", saveScroll);

    return () =>
      window.removeEventListener("scroll", saveScroll);
  }, [location.pathname]);

  return null;
}

export default ScrollManager;