import { useEffect } from "react";
import {
  useLocation,
  useNavigationType,
} from "react-router-dom";

const positions = new Map<string, number>();

function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();

  // منع المتصفح من استرجاع الـ Scroll تلقائيًا
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // حفظ مكان الـ Scroll
  useEffect(() => {
    const savePosition = () => {
      positions.set(
        location.key,
        window.scrollY
      );
    };

    window.addEventListener(
      "scroll",
      savePosition
    );

    return () => {
      savePosition();
      window.removeEventListener(
        "scroll",
        savePosition
      );
    };
  }, [location]);

  // استرجاع أو تصفير الـ Scroll
  useEffect(() => {
    if (navigationType === "POP") {
      const y =
        positions.get(location.key) ?? 0;

      requestAnimationFrame(() => {
        window.scrollTo(0, y);
      });

      return;
    }

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

  }, [location, navigationType]);

  return null;
}

export default ScrollManager;