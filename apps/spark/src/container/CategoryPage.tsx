import React, { FC } from "react";
import { match } from "react-router";
import CategoryBySeoSegmentQuery from "../queries/CategoryBySeoSegmentQuery";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, CategoryNotFoundAlert } from "../components/Error/Alert";
import DetailedCategory from "../components/Category/DetailedCategory";
import { DetailCategory } from "../models/Detail/DetailCategory";
import { initializeGrid } from "../models/Grid/Grid";
import { useSiteContextState } from "../context/SiteContextProvider";
import CategoryByIdQuery from "../queries/CategoryByIdQuery";

interface PageProps {
  match: match<RouteProps>;
}

interface RouteProps {
  catalogPath: string;
  seoSegment: string;
}

const CategoryPage: FC<PageProps> = ({ match }) => {
  let category = null;
  const { useSeo, siteId } = useSiteContextState();
  if (useSeo) {
    const { data, loading, error } = CategoryBySeoSegmentQuery(match.params.seoSegment, siteId);
    if (loading) return <Loading />;
    if (error) return <ApolloClientAlert error={error} />;
    if (!data || !data.categoryBySeoSegment) {
      return <CategoryNotFoundAlert />;
    }
    category = data.categoryBySeoSegment;
  } else {
    const { data, loading, error } = CategoryByIdQuery(match.params.seoSegment, siteId);
    if (loading) return <Loading />;
    if (error) return <ApolloClientAlert error={error} />;
    if (!data || !data.category) {
      return <CategoryNotFoundAlert />;
    }
    category = data.category;
  }

  const detailCategory: DetailCategory = {
    ...category,
    grid: category.augmentation && initializeGrid(category.augmentation.grid),
  };
  return <DetailedCategory {...detailCategory} />;
};

export default CategoryPage;
