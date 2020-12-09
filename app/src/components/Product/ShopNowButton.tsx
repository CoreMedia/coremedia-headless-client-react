import React from "react";
import Link from "../Link/Link";
import { ProductBanner } from "../../models/Banner/ProductBanner";
import "./ShopNowButton.scss";

interface Props {
  banner: ProductBanner;
}

const ShopNowButton: React.FC<Props> = ({ banner }) => {
  return (
    <>
      {banner.shopNowConfiguration && (
        <div className={`shop-now`}>
          <Link to={banner.linkTarget} className={`shop-now__button cm-button`}>
            <span className="cm-button__text">Shop Now</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default ShopNowButton;
