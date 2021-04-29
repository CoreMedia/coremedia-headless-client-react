export const defaultQueryString = `
query ContentQuery {
  content {
    content(id: "6824") {
      repositoryPath
      __typename
      ...FragmentPage
    }
  }
}

query CategoryQuery {
  category(categoryId: "Apparel", siteId: "ced8921aa7b7f9b736b90e19afc2dd2a") {
    name
    children {
      id
    }
  }
}

query AugmentationForCategory {
  category(categoryId: "c2", siteId: "commercetoolsenus") {
    ...CatalogCategory
    augmentation {
      content {
        repositoryPath
      }
      grid {
        cssClassName
      }
    }
  }
}

query AugmentationForProduct {
  product(externalId: "pA0E200000002E3F", siteId: "commercetoolsenus") {
    ...CatalogProduct
    augmentation {
      content {
        repositoryPath
      }
      grid {
        cssClassName
      }
    }
  }
}

fragment CommerceRef on CommerceRef {
  ...CategoryRef
  ...ProductRef
}

fragment ProductRef on ProductRef {
  externalId
  siteId
  storeId
  locale
  catalogId
  product {
    ...CatalogProduct
  }
}

fragment CategoryRef on CategoryRef {
  externalId
  siteId
  storeId
  locale
  catalogId
  category {
    ...CatalogCategory
  }
}

fragment FragmentPage on CMChannel {
  grid {
    cssClassName
    rows {
      placements {
        items {
          ...ExternalChannel
          ...ExternalProduct
          ...ExternalProductTeaser
          ...Teasable
        }
      }
    }
  }
}

fragment ExternalProductTeaser on CMProductTeaserImpl {
  id
  externalId
  productRef {
    ...CommerceRef
  }
}

fragment ExternalProduct on CMExternalProductImpl {
  id
  externalId
  productRef {
    ...CommerceRef
  }
}

fragment ExternalChannel on CMExternalChannelImpl {
  id
  externalId
  segment
  categoryRef {
    ...CommerceRef
  }
}

fragment CatalogProduct on Product {
  id
  externalId
  name
  shortDescription
  category {
    id
  }
}

fragment CatalogCategory on Category {
  id
  externalId
  name
  shortDescription
  parent {
    id
  }
  children {
    id
  }
}

fragment Teasable on CMTeasable {
  teaserTarget {
    ...ExternalChannel
    ...ExternalProduct
  }
  teaserTargets {
    target {
      ...ExternalChannel
      ...ExternalProduct
    }
  }
}
`;
