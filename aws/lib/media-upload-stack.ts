import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as iam from 'aws-cdk-lib/aws-iam'
import { Construct } from 'constructs'

export class MediaUploadStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Build Environment Upload Bucket
    const buildBucket = new s3.Bucket(this, 'BuildMediaUploadsBucket', {
      bucketName: `swe40006-build-media-uploads-${this.account}`,
      cors: [{
        allowedHeaders: ['*'],
        allowedMethods: [s3.HttpMethods.PUT, s3.HttpMethods.POST, s3.HttpMethods.GET],
        allowedOrigins: ['*'],
        maxAge: 3000,
      }],
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
    })

    // Test Environment Upload Bucket
    const testBucket = new s3.Bucket(this, 'TestMediaUploadsBucket', {
      bucketName: `swe40006-test-media-uploads-${this.account}`,
      cors: [{
        allowedHeaders: ['*'],
        allowedMethods: [s3.HttpMethods.PUT, s3.HttpMethods.POST, s3.HttpMethods.GET],
        allowedOrigins: ['*'],
        maxAge: 3000,
      }],
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
    })

    // Production Environment Upload Bucket
    const prodBucket = new s3.Bucket(this, 'ProdMediaUploadsBucket', {
      bucketName: `swe40006-prod-media-uploads-${this.account}`,
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

    // Grant upload permissions to all media buckets
    buildBucket.grantPut(uploadUser)
    buildBucket.grantRead(uploadUser)
    testBucket.grantPut(uploadUser)
    testBucket.grantRead(uploadUser)
    prodBucket.grantPut(uploadUser)
    prodBucket.grantRead(uploadUser)

    // Create access key
    const accessKey = new iam.AccessKey(this, 'MediaUploadAccessKey', {
      user: uploadUser,
    })

    new cdk.CfnOutput(this, 'BuildMediaBucketName', {
      value: buildBucket.bucketName,
    })

    new cdk.CfnOutput(this, 'TestMediaBucketName', {
      value: testBucket.bucketName,
    })

    new cdk.CfnOutput(this, 'ProdMediaBucketName', {
      value: prodBucket.bucketName,
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

    new cdk.CfnOutput(this, 'UploadUserArn', {
      value: uploadUser.userArn,
    })
  }
}