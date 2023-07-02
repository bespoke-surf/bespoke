const s3FolderUpload = require("s3-folder-upload");
const invariant = require("tiny-invariant");

invariant(process.env.AWS_ACCESS_KEY_ID, "AWS ACCESS KEY ID is missing");
invariant(
  process.env.AWS_SECRET_ACCESS_KEY,
  "AWS SECRET ACCESS KEY is missing"
);
invariant(process.env.AWS_S3_BUCKET, "AWS S3 BUCKET is missing");
invariant(process.env.AWS_S3_BUCKET_REGION, "AWS S3 BUCKET REGIO is missing");

const directoryName = "./public/build";
// I strongly recommend to save your credentials on a JSON or ENV variables, or command line args
const credentials = {
  // using dotenv-cli for process.env
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_BUCKET_REGION,
  bucket: process.env.AWS_S3_BUCKET,
};

// optional options to be passed as parameter to the method
const options = {
  useFoldersForFileTypes: false,
  uploadFolder: "build",
  ACL: "public-read",
  CacheControl: "public, max-age=31536000, s-maxage=31536000, immutable",
};

// optional cloudfront invalidation rule
// const invalidation = {
//   awsDistributionId: "<Your CloudFront Distribution Id>",
//   awsInvalidationPath: "<The Path to Invalidate>",
// };

s3FolderUpload(directoryName, credentials, options);
