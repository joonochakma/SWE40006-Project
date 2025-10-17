import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import { Construct } from 'constructs'

export class StaticHostingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Build Environment
    const buildBucket = new s3.Bucket(this, 'BuildHostingBucket', {
      bucketName: `swe40006-build-hosting-${this.account}`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    // Test Environment
    const testBucket = new s3.Bucket(this, 'TestHostingBucket', {
      bucketName: `swe40006-test-hosting-${this.account}`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    // Production Environment
    const prodBucket = new s3.Bucket(this, 'ProdHostingBucket', {
      bucketName: `swe40006-prod-hosting-${this.account}`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    const prodDistribution = new cloudfront.Distribution(this, 'ProdDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(prodBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      errorResponses: [{
        httpStatus: 404,
        responseHttpStatus: 200,
        responsePagePath: '/index.html',
      }],
    })

    new cdk.CfnOutput(this, 'BuildBucketName', {
      value: buildBucket.bucketName,
    })

    new cdk.CfnOutput(this, 'TestBucketName', {
      value: testBucket.bucketName,
    })

    new cdk.CfnOutput(this, 'ProdBucketName', {
      value: prodBucket.bucketName,
    })

    new cdk.CfnOutput(this, 'ProdCloudFrontURL', {
      value: prodDistribution.distributionDomainName,
    })
  }
}