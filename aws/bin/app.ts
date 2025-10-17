#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { MediaUploadStack } from '../lib/media-upload-stack'
import { StaticHostingStack } from '../lib/static-hosting-stack'

const app = new cdk.App()

new MediaUploadStack(app, 'MediaUploadStack', {
  env: {
    region: 'ap-southeast-2',
  },
})

new StaticHostingStack(app, 'StaticHostingStack', {
  env: {
    region: 'ap-southeast-2',
  },
})