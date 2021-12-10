import React, { FC } from "react";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import Include from "../../utils/ViewDispatcher/Include";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { metaDataForPlacement } from "../../utils/Preview/MetaData";
import { Col } from "../../models/Grid/Grid";
import { getWorkspaceVersion } from "../../utils/App/App";

import "./Footer.scss";

const Footer: FC = () => {
  const name = "footer";
  const { placements } = useSiteContextState();
  const placement: Col | null | undefined = placements?.find((item) => item && item.name === name);
  const items: Dispatchable[] | null | undefined = placement && placement?.items;
  return (
    <div className={`cm-placement cm-placement--${name}`} {...(placement && metaDataForPlacement(placement))}>
      <footer id={`cm-${name}`} className={"cm-footer"}>
        <div className={"cm-footer__wrapper"}>
          <div className={"cm-footer__copyright"}>© CoreMedia GmbH</div>

          {items && (
            <ul className={"cm-footer__links"}>
              {items.map((link, index) => {
                return (
                  <li className={"cm-footer__item"} key={index}>
                    {<Include self={link} view={"asFooterLink"} />}
                  </li>
                );
              })}
            </ul>
          )}

          <div className="cm-footer__social-icons">
            <a href="https://www.facebook.com/coremedia" target="_blank" rel="noopener noreferrer">
              <i className="social-icon facebook" />
            </a>
            <a href="https://de.linkedin.com/company/coremedia-ag" target="_blank" rel="noopener noreferrer">
              <i className="social-icon linkedin" />
            </a>
            <a href="https://twitter.com/CoreMedia" target="_blank" rel="noopener noreferrer">
              <i className="social-icon twitter" />
            </a>
            <a href="https://www.youtube.com/user/coremediachannel" target="_blank" rel="noopener noreferrer">
              <i className="social-icon youtube" />
            </a>
          </div>
          <div className="cm-footer__version">
            Version: <b>{getWorkspaceVersion()}</b>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
