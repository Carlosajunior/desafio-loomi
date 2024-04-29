import { S3Client } from '@aws-sdk/client-s3';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const awsS3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
