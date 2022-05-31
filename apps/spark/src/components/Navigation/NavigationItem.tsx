import React, { FC, useState } from "react";
import styled from "styled-components";
import Link from "../Link/Link";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { formatSegmentForUrl } from "../../utils/Link/LinkUtils";

import { NavigationProps } from "../../models/Navigation/Navigation";
import Image from "../Media/Image";
import NavigationMenu, { NavigationItemTitle, NavigationToggle, StyledNavigationItem } from "./NavigationMenu";

const NavigationPicture = styled(Link)`
  padding: 0 15px;
  > div {
    display: none;
    position: relative;
    overflow: hidden;

    @media screen and (min-width: 1200px) {
      display: block;
    }
  }
`;

const NavigationItem: FC<NavigationProps> = ({
  linkTarget,
  title,
  depth,
  picture,
  code,
  isTopLevel,
  items,
  maxDepth = -1,
  metadata = {},
}) => {
  const [toggled, setToggled] = useState(false);
  const { currentNavigation } = useSiteContextState();
  return (
    <StyledNavigationItem
      open={toggled !== undefined && toggled}
      active={currentNavigation && currentNavigation.indexOf(formatSegmentForUrl(title)) !== -1}
      depth={depth}
      {...metaDataElement(metadata.root)}
    >
      {linkTarget && (
        <NavigationItemTitle as={Link} to={linkTarget}>
          {title}
        </NavigationItemTitle>
      )}
      {!linkTarget && <NavigationItemTitle>{title}</NavigationItemTitle>}
      {isTopLevel && <NavigationToggle type="button" aria-haspopup="true" onClick={() => setToggled(!toggled)} />}
      {/*If items are available, render them as navigation menu*/}
      {items && items.length > 0 && (
        <NavigationMenu
          code={code}
          linkTarget={linkTarget}
          items={items}
          picture={picture}
          title={title}
          depth={depth}
          maxDepth={maxDepth}
          isTopLevel={false}
        />
      )}
      {/*no items, a picture and level 2 --> render the picture*/}
      {(!items || items.length === 0) && picture && depth === 2 && (
        <NavigationPicture to={linkTarget}>
          <div {...metaDataProperty(metadata?.properties?.picture)}>
            <Image picture={picture} width={208} cropName={"landscape_ratio16x9"} />
          </div>
        </NavigationPicture>
      )}
    </StyledNavigationItem>
  );
};
export default NavigationItem;
