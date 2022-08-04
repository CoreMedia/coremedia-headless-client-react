import React from "react";
import { getLink } from "../../utils/Link/LinkUtils";
import { useCategoryPageContextState } from "../../context/CategoryPageContext";
import { useSiteContextState } from "../../context/SiteContextProvider";

const SubCategoryList: React.FC = () => {
  const { categoryChildren, categoryName } = useCategoryPageContextState();
  const { rootSegment } = useSiteContextState();
  return (
    <>
      {categoryChildren && categoryChildren.length > 0 && (
        <>
          <h3 className={"cm-subcategory__title"}>{categoryName}</h3>
          <ul className={"cm-subcategory__items"}>
            {categoryChildren
              .filter((item) => {
                return item !== null;
              })
              .map((item, index) => {
                return (
                  item && (
                    <li key={index}>
                      <a href={getLink(item, rootSegment).linkTarget || ""}>{item.name}</a>
                    </li>
                  )
                );
              })}
          </ul>
        </>
      )}
    </>
  );
};

export default SubCategoryList;
