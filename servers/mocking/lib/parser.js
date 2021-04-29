const { parse } = require("graphql");

function getSiteId(reqBody) {
  if (!reqBody || !reqBody.variables) {
    return null;
  }

  let result = null;
  if (reqBody.variables.siteId) {
    result = reqBody.variables.siteId;
  } else if (reqBody.variables._v0_siteId) {
    result = reqBody.variables._v0_siteId;
  } else if (reqBody.variables._v1_siteId) {
    result = reqBody.variables._v1_siteId;
  }

  return result;
}

function getCategoryId(reqBody) {
  if (!reqBody || !reqBody.variables) {
    return null;
  }

  let result = null;
  if (reqBody.variables._v0_categoryId) {
    result = reqBody.variables._v0_categoryId;
  } else if (reqBody.variables.categoryId) {
    result = reqBody.variables.categoryId;
  }

  return result;
}

function getExternalId(reqBody) {
  if (!reqBody || !reqBody.variables) {
    return null;
  }

  let result = null;
  if (reqBody.variables._v0_externalId) {
    result = reqBody.variables._v0_externalId;
  } else if (reqBody.variables.externalId) {
    result = reqBody.variables.externalId;
  } else if (reqBody.variables.rootSegment) {
    result = reqBody.variables.rootSegment;
  }

  return result;
}

function getSeoSegment(reqBody) {
  if (!reqBody || !reqBody.variables) {
    return null;
  }

  let result = null;
  if (reqBody.variables.seoSegment) {
    result = reqBody.variables.seoSegment;
  }

  return result;
}

function getId(reqBody) {
  if (!reqBody || !reqBody.variables) {
    return null;
  }

  let result = getSeoSegment(reqBody);
  if (!result) {
    result = getCategoryId(reqBody);
  }

  if (!result) {
    result = getExternalId(reqBody);
  }

  return result;
}

function parseQueryName(reqBody) {
  if (reqBody.query) {
    const parsedGqlQuery = parse(reqBody.query);
    const gqlOperationName = parsedGqlQuery.definitions[0].operation;
    if (gqlOperationName === "query") {
      let gqlQueryName = parsedGqlQuery.definitions[0].selectionSet.selections[0].name.value;
      if (gqlQueryName === "content" || gqlQueryName === "commerce") {
        gqlQueryName = parsedGqlQuery.definitions[0].selectionSet.selections[0].selectionSet.selections[0].name.value;
      }
      if (gqlQueryName) {
        return gqlQueryName;
      }
    }
  }

  return null;
}

module.exports = {
  getSiteId,
  getId,
  parseQueryName,
};
