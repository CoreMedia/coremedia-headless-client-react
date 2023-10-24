import { FC, useEffect } from "react";
import log from "loglevel";
import { useSiteContextState } from "../../context/SiteContextProvider";

const BysideTag: FC = () => {
  const webcareId = import.meta.env.VITE_BYSIDE_WEBCARE_ID;
  const webcareUrl = import.meta.env.VITE_BYSIDE_WEBCARE_SCRIPT_URL ?? "https://bywe2.byside.com/agent/bwc_we2.js";
  const { siteLocale } = useSiteContextState();
  const bsi1 = document.getElementById("bysideIntegration1");
  const bsi2 = document.getElementById("bysideIntegration2");

  useEffect(() => {
    if (!bsi1 && !bsi2 && webcareId) {
      log.info("Loading Byside Tag", webcareId, webcareUrl);

      const script1 = document.createElement("script");
      script1.setAttribute("id", "bysideIntegration1");
      script1.innerText = `var bysideWebcare_webcare_id="${webcareId}"; var bysideWebcare_lang = "${siteLocale}";`;
      document.body.appendChild(script1);

      const script2 = document.createElement("script");
      script2.setAttribute("id", "bysideIntegration2");
      script2.setAttribute("src", webcareUrl);
      document.body.appendChild(script2);
    }
  }, []);

  return null;
};

export default BysideTag;
