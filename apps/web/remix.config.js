const { flatRoutes } = require("remix-flat-routes");
// const invariant = require("tiny-invariant");

// using dotenv-cli for process.env

function getPublicPath() {
  return "/build/";
  // let defaultCDN = process.env.CLOUDFRONT;
  // let isCI = process.env.CI ?? false; // only configure this when building on CI
  // if (!isCI) return "/build/";
  // if (isCI) {
  //   invariant(process.env.CLOUDFRONT, "CLOUDTFRONT is missing");
  // }
  // return `${defaultCDN}/build/`;
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
