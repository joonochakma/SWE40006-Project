import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
})

export const uploadToS3 = async (file) => {
  const startTime = performance.now()
  const key = `media/${Date.now()}-${file.name}`
  
  // Convert file to ArrayBuffer for AWS SDK v3 compatibility
  const arrayBuffer = await file.arrayBuffer()
  const uint8Array = new Uint8Array(arrayBuffer)
  
  const command = new PutObjectCommand({
    Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
    Key: key,
    Body: uint8Array,
    ContentType: file.type,
  })

  try {
    await s3Client.send(command)
    const endTime = performance.now()
    const uploadTime = endTime - startTime
    
    // Log and emit performance metrics
    const metricsData = {
      fileName: file.name,
      fileSize: file.size,
      uploadTime: `${uploadTime.toFixed(2)}ms`,
      throughput: `${(file.size / (uploadTime / 1000) / 1024).toFixed(2)} KB/s`,
      timestamp: new Date().toISOString()
    }
    
    console.log(`S3 Upload Metrics:`, metricsData)
    
    // Emit metrics event for dashboard
    window.dispatchEvent(new CustomEvent('s3Metrics', {
      detail: { type: 's3Upload', data: metricsData }
    }))
    
    return `https://${import.meta.env.VITE_S3_BUCKET_NAME}.s3.ap-southeast-2.amazonaws.com/${key}`
  } catch (error) {
    const endTime = performance.now()
    console.error(`S3 Upload Failed:`, {
      fileName: file.name,
      fileSize: file.size,
      duration: `${(endTime - startTime).toFixed(2)}ms`,
      error: error.message,
      timestamp: new Date().toISOString()
    })
    throw new Error(`Upload failed: ${error.message}`)
  }
}