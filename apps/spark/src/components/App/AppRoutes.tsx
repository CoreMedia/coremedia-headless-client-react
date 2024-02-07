import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import DetailPage from "../../pages/DetailPage";
import Page from "../../pages/Page";
import ProductPage from "../../pages/ProductPage";
import CategoryPage from "../../pages/CategoryPage";
import SearchPage from "../../pages/SearchPage";
import CartPage from "../../pages/CartPage";
import TopicPage from "../../pages/TopicPage";
import AuthorPage from "../../pages/AuthorPage";
import CheckoutPage from "../Checkout/CheckoutPage";

/**
 * The site specific routes of the app
 * @category Components
 */
const AppRoutes: FC = () => {
  return (
    <Switch>
      {/* Cart */}
      <Route path="/:rootSegment/cart" component={CartPage} />
      {/* Checkout */}
      <Route path="/:rootSegment/checkout" component={CheckoutPage} />
      {/* Search */}
      <Route path="/:rootSegment/search" component={SearchPage} />
      {/* Tag */}
      <Route path="/:rootSegment/tag/:pathSegments+/:title-:id([0-9]+)" component={TopicPage} />
      <Route path="/:rootSegment/tag/:title-:id([0-9]+)" component={TopicPage} />
      {/* Author */}
      <Route path="/:rootSegment/author/:title-:id([0-9]+)" component={AuthorPage} />
      {/* Commerce */}
      <Route path="/:rootSegment/product/:seoSegment" exact component={ProductPage} />
      <Route path="/:rootSegment/product/:catalogPath+/:seoSegment" component={ProductPage} />
      <Route path="/:rootSegment/category/:catalogPath+/:seoSegment" component={CategoryPage} />
      <Route path="/:rootSegment/category/:seoSegment" component={CategoryPage} />
      {/* Detail */}
      <Route path="/:pathSegments+/:title-:id([0-9]+)" component={DetailPage} />
      {/* Page, Catch-All */}
      <Route path="/:pathSegments+" component={Page} />
    </Switch>
  );
};
export default AppRoutes;
