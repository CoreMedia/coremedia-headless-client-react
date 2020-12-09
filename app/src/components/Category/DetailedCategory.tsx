import React from "react";
import "./Category.scss";
import { colByName } from "../../utils/PageGrid/PageGridUtil";
import Col from "../PageGrid/Col";
import { DetailCategory } from "../../models/Detail/DetailCategory";

const DetailedCategory: React.FC<DetailCategory> = ({ name, grid }) => {
  return (
    <div className={`cm-details-container`}>
      <div className={`cm-details cm-clp`}>
        <Col col={colByName(grid, "hero")} />
        <h1 className={`cm-details__headline cm-category-details`}>{name}</h1>
        <div className="cm-row">
          <div className={`cm-details__sidebar`}>
            <Col col={colByName(grid, "sidebar")} />
          </div>
          <div className={`cm-details__content`}>
            <Col col={colByName(grid, "main")} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailedCategory;
