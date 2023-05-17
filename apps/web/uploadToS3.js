const s3FolderUpload = require("s3-folder-upload");
// or the ES6 way
// import s3FolderUpload from 's3-folder-upload'

const directoryName = "./public/build";
// I strongly recommend to save your credentials on a JSON or ENV variables, or command line args
const credentials = {
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
