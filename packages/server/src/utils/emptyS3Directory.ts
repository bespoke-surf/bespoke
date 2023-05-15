import S3, { DeleteObjectsRequest } from 'aws-sdk/clients/s3';

export async function emptyS3Directory(bucket: string, dir: string, s3: S3) {
  const listParameters = {
    Bucket: bucket,
    Prefix: dir,
  };

  const listedObjects = await s3.listObjectsV2(listParameters).promise();
  if (!listedObjects) {
    return;
  }

  if (listedObjects.Contents?.length === 0) {
    return;
  }

  const deleteParameters: DeleteObjectsRequest = {
    Bucket: bucket,
    Delete: { Objects: [] },
  };

  if (listedObjects.Contents)
    for (const { Key } of listedObjects.Contents) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      deleteParameters.Delete.Objects.push({ Key });
    }

  await s3.deleteObjects(deleteParameters).promise();

  if (listedObjects.IsTruncated) {
    await emptyS3Directory(bucket, dir, s3);
  }
}
