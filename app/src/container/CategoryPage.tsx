import React, { FC } from "react";
import { match } from "react-router";
import CategoryBySeoSegmentQuery from "../queries/CategoryBySeoSegmentQuery";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, CategoryNotFoundAlert } from "../components/Error/Alert";
import DetailedCategory from "../components/Category/DetailedCategory";
import { DetailCategory } from "../models/Detail/DetailCategory";
import { initializeGrid } from "../models/Grid/Grid";

interface PageProps {
  match: match<RouteProps>;
}

interface RouteProps {
  catalogPath: string;
  seoSegment: string;
}

const CategoryPage: FC<PageProps> = ({ match }) => {
  const { data, loading, error } = CategoryBySeoSegmentQuery(match.params.seoSegment);

  if (loading) return <Loading />;
  if (error) return <ApolloClientAlert error={error} />;
  if (!data || !data.commerce || (!data.commerce.categoryBySeoSegment && !data.commerce.category)) {
    return <CategoryNotFoundAlert />;
  }

  const cat = data.commerce.categoryBySeoSegment || data.commerce.category;
  if (!cat) {
    return <CategoryNotFoundAlert />;
  }

  const detailCategory: DetailCategory = {
    ...cat,
    grid: initializeGrid(cat.grid),
  };
  return <DetailedCategory {...detailCategory} />;
};

export default CategoryPage;
