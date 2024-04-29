import { PutObjectCommand } from '@aws-sdk/client-s3';
import { NotAcceptableException } from '@nestjs/common';
import { awsS3Client } from 'src/config/aws-s3/aws-s3-client';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export class AwsS3Service {
  async uploadFileToS3(data: { fileBuffer: Buffer; fileName: string }) {
    try {
      const command = new PutObjectCommand({
        Body: data.fileBuffer,
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: data.fileName,
      });

      await awsS3Client.send(command);
      return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${data.fileName}`;
    } catch (error) {
      throw new NotAcceptableException(error);
    }
  }
}
