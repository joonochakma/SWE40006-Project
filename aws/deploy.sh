#!/bin/bash
cd aws
npm install
npx cdk bootstrap
npx cdk deploy
echo "S3 bucket deployed to Sydney region. Update your .env file with the bucket name from the output above."