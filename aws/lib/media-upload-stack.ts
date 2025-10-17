import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as iam from 'aws-cdk-lib/aws-iam'
import { Construct } from 'constructs'

export class MediaUploadStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const bucket = new s3.Bucket(this, 'MediaUploadsBucket', {
      bucketName: `swe40006-media-uploads-${this.account}`,
      cors: [{
        allowedHeaders: ['*'],
        allowedMethods: [s3.HttpMethods.PUT, s3.HttpMethods.POST, s3.HttpMethods.GET],
        allowedOrigins: ['*'],
        maxAge: 3000,
      }],
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
    })

    // Create IAM user for frontend uploads
    const uploadUser = new iam.User(this, 'MediaUploadUser', {
      userName: 'swe40006-media-upload-user',
    })

    // Grant upload permissions
    bucket.grantPut(uploadUser)
    bucket.grantRead(uploadUser)

    // Create access key
    const accessKey = new iam.AccessKey(this, 'MediaUploadAccessKey', {
      user: uploadUser,
    })

    new cdk.CfnOutput(this, 'BucketName', {
      value: bucket.bucketName,
    })

    new cdk.CfnOutput(this, 'BucketRegion', {
      value: this.region,
    })

    new cdk.CfnOutput(this, 'AccessKeyId', {
      value: accessKey.accessKeyId,
    })

    new cdk.CfnOutput(this, 'SecretAccessKey', {
      value: accessKey.secretAccessKey.unsafeUnwrap(),
    })
  }
}