// CloudWatch custom metrics for S3 operations
import { CloudWatchClient, PutMetricDataCommand } from '@aws-sdk/client-cloudwatch'

const cloudWatch = new CloudWatchClient({ region: 'ap-southeast-2' })

export const sendS3Metrics = async (metrics) => {
  const params = {
    Namespace: 'S3Upload/Performance',
    MetricData: [
      {
        MetricName: 'UploadDuration',
        Value: metrics.uploadTime,
        Unit: 'Milliseconds',
        Timestamp: new Date()
      },
      {
        MetricName: 'FileSize',
        Value: metrics.fileSize,
        Unit: 'Bytes',
        Timestamp: new Date()
      },
      {
        MetricName: 'Throughput',
        Value: metrics.throughput,
        Unit: 'Count/Second',
        Timestamp: new Date()
      }
    ]
  }

  try {
    await cloudWatch.send(new PutMetricDataCommand(params))
  } catch (error) {
    console.error('CloudWatch metrics failed:', error)
  }
}