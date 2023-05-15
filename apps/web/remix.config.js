const { flatRoutes } = require("remix-flat-routes");

function getPublicPath() {
  let defaultCDN = "https://d2f79r0dzl32ik.cloudfront.net";
  let isCI = process.env.CI ?? false; // only configure this when building on CI
  if (!isCI) return "/build/";
  return `${defaultCDN}/build/`;
}

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/*"],
  publicPath: getPublicPath(),
  serverDependenciesToBundle: [/^@uppy.*/, /^exifr.*/, "axios"],
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes);
  },
};
