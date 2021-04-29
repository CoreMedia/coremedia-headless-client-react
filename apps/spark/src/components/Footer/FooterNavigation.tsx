import React, { FC } from "react";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";
import Include from "../../utils/ViewDispatcher/Include";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { metaDataForPlacement } from "../../utils/Preview/MetaData";
import { Col } from "../../models/Grid/Grid";

const FooterNavigation: FC = () => {
  const name = "footer-navigation";
  const { placements } = useSiteContextState();
  const placement: Col | null | undefined = placements?.find((item) => item && item.name === name);
  const items: Dispatchable[] | null | undefined = placement && placement?.items;

  return (
    <div className={`cm-placement cm-placement--${name}`} {...(placement && metaDataForPlacement(placement))}>
      {items && (
        <div className="cm-footer-navigation">
          <div className="cm-footer-navigation__columns">
            {items.map((column, index) => {
              return <Include self={column} key={index} view={"asFooterNavigationColumn"} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FooterNavigation;
