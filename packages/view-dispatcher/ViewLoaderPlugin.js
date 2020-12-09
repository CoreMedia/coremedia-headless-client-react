const glob = require("glob");
const path = require("path");
const { default: InjectPlugin, ENTRY_ORDER } = require("webpack-inject-plugin");

function formatViewImport(viewPath, index) {
  const extName = path.extname(viewPath);
  if (!extName) {
    throw new Error("Found invalid file: " + viewPath);
  }
  const importPath = viewPath.slice(0, viewPath.lastIndexOf(extName));
  const viewParts = viewPath
    .slice(viewPath.lastIndexOf("/") + 1, viewPath.indexOf(extName))
    .split(".");
  const viewName =
    viewParts.length > 1
      ? `"${viewParts[0]}", "${viewParts[1]}"`
      : `"${viewParts[0]}"`;
  return `
    import c${index + 1} from ${(JSON.stringify(importPath))};
    viewDispatcher.addViewComponent(c${index + 1}, ${viewName});
`;
}

const customLoader = (options) => {
  options = options || {};
  if (!options.root) {
    throw new Error("Root must be set!");
  }
  if (!options.viewPattern) {
    throw new Error("View Path is not set!");
  }
  return () => {
    const views = glob.sync(options.viewPattern, {
      cwd: options.root
    });

    const viewImports = views.map((template, index) => formatViewImport(template, index));

    return `${options.viewDispatcherImportCode || ""}

    ${viewImports.join("\n")}`;
  }
};

class ViewLoaderPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    new InjectPlugin(customLoader(this.options), {
      entryOrder: ENTRY_ORDER.First,
    }).apply(compiler);
  }
}

module.exports = ViewLoaderPlugin;
