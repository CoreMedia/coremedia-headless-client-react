import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import DetailPage from "../../container/DetailPage";
import Page from "../../container/Page";
import ProductPage from "../../container/ProductPage";
import CategoryPage from "../../container/CategoryPage";
import SearchPage from "../../container/SearchPage";
import TopicPage from "../../container/TopicPage";

/**
 * The site specific routes of the app
 * @category Components
 */
const AppRoutes: FC = () => {
  return (
    <Switch>
      {/* Search */}
      <Route path="/:rootSegment/search" component={SearchPage} />
      {/* Tag */}
      <Route path="/:rootSegment/tag/:pathSegments+/:title-:id([0-9]+)" component={TopicPage} />
      <Route path="/:rootSegment/tag/:title-:id([0-9]+)" component={TopicPage} />
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
