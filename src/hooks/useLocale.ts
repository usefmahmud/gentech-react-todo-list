import { useEffect, useState } from "react";
import i18next from "i18next";
import { trackEvent } from "../utils/analytics";

const useLocale = () => {
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    i18next.changeLanguage(locale);
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";

    trackEvent("Language Change", {
      locale
    })

    localStorage.setItem("language", locale);
  }, [locale]);

  return { locale, setLocale };
};

export default useLocale;