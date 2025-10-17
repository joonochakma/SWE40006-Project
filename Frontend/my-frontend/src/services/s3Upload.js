import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
})

export const uploadToS3 = async (file) => {
  const key = `media/${Date.now()}-${file.name}`
  
  const command = new PutObjectCommand({
    Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: file.type,
  })

  try {
    await s3Client.send(command)
    return `https://${import.meta.env.VITE_S3_BUCKET_NAME}.s3.ap-southeast-2.amazonaws.com/${key}`
  } catch (error) {
    throw new Error(`Upload failed: ${error.message}`)
  }
}