import { useEffect } from "react";
import {
  useLocation,
  useNavigationType,
} from "react-router-dom";

const positions = new Map<string, number>();

function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();

  /*
   * منع المتصفح من استرجاع الـ scroll بنفسه.
   * ScrollManager هو المسؤول عن ذلك.
   */
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  /*
   * حفظ مكان الـ scroll للصفحة الحالية.
   */
  useEffect(() => {
    const savePosition = () => {
      positions.set(
        location.key,
        window.scrollY
      );
    };

    window.addEventListener(
      "scroll",
      savePosition,
      { passive: true }
    );

    return () => {
      savePosition();

      window.removeEventListener(
        "scroll",
        savePosition
      );
    };
  }, [location.key]);

  /*
   * التحكم في مكان الـ scroll بعد التنقل.
   *
   * PUSH / REPLACE:
   * تبدأ الصفحة من الأعلى.
   *
   * POP:
   * ترجع للمكان السابق.
   */
  useEffect(() => {
    const timer = window.setTimeout(() => {

      /*
       * Back / Forward
       * استرجاع مكان الصفحة السابق.
       */
      if (navigationType === "POP") {
        const savedPosition =
          positions.get(location.key) ?? 0;

        window.scrollTo({
          top: savedPosition,
          left: 0,
          behavior: "instant",
        });

        return;
      }

      /*
       * لو الرابط فيه Hash
       * مثل:
       * /#offers
       */
      if (location.hash) {
        const sectionId =
          location.hash.substring(1);

        const section =
          document.getElementById(sectionId);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          return;
        }
      }

      /*
       * أي صفحة جديدة تبدأ من أعلى الصفحة.
       */
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });

    }, 0);

    return () => {
      window.clearTimeout(timer);
    };

  }, [
    location.key,
    location.pathname,
    location.hash,
    navigationType,
  ]);

  return null;
}

export default ScrollManager;