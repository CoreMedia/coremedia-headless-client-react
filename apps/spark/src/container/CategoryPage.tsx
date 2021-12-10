import React, { FC } from "react";
import { match } from "react-router-dom";
import CategoryBySeoSegmentQuery from "../queries/CategoryBySeoSegmentQuery";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, CategoryNotFoundAlert } from "../components/Error/Alert";
import DetailedCategory from "../components/Category/DetailedCategory";
import { DetailCategory } from "../models/Detail/DetailCategory";
import { initializeGrid } from "../models/Grid/Grid";
import CategoryByIdQuery from "../queries/CategoryByIdQuery";
import { getGlobalState } from "../utils/App/GlobalState";
import SeoHeader from "../components/Header/SeoHeader";
import RootPreviewId from "../components/FragmentPreview/RootPreviewId";
import { initializeMetadata } from "../utils/Preview/MetaData";

interface PageProps {
  match: match<RouteProps>;
}

interface RouteProps {
  catalogPath: string;
  seoSegment: string;
}

const CategoryPage: FC<PageProps> = ({ match }) => {
  let category = null;
  const { useSeo, siteId } = getGlobalState();
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
    ...initializeMetadata(category.augmentation?.content?.id || category.id, "commerce"),
  };
  return (
    <>
      <SeoHeader title={detailCategory.name} />
      <RootPreviewId metadataRoot={detailCategory.metadata?.root} />
      <DetailedCategory {...detailCategory} />
    </>
  );
};

export default CategoryPage;
