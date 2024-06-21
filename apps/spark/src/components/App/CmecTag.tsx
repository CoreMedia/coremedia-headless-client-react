import React, { FC } from "react";
import { Helmet } from "react-helmet-async";
import log from "loglevel";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { isPreview } from "../../utils/Preview/Preview";

const CmecTag: FC = () => {
  const { siteLocale, cmecConfig } = useSiteContextState();
  let cmecVars = "";

  /* no cmec configuration available, just load p13n */
  if (!cmecConfig) {
    return <></>;
  }

  log.info("Loading CoreMedia Engagement Cloud Tag", cmecConfig.id, cmecConfig.url);

  cmecVars = `var bysideWebcare_webcare_id="${cmecConfig?.id}";`;
  const lang = new Intl.Locale(siteLocale);
  cmecVars += `var bysideWebcare_lang="${lang.language}";`;
  cmecVars += `var bysideWebcare_locale="${siteLocale}";`;
  if (isPreview()) {
    cmecVars += `var bysideWebcare_preview=true;`;
  }

  return (
    <Helmet>
      <script>{cmecVars}</script>
      <script src={cmecConfig?.url}></script>
    </Helmet>
  );
};

export default CmecTag;
