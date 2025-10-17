import { uploadToS3 } from '../services/s3Upload'

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.type.startsWith('audio/')) {
      try {
        console.log('Uploading:', file.name)
        const url = await uploadToS3(file)
        console.log('Upload successful:', url)
        alert('File uploaded successfully!')
      } catch (error) {
        console.error('Upload failed:', error)
        alert('Upload failed: ' + error.message)
      }
    } else {
      alert('Please Select an Audio File')
      event.target.value = ''
    }
  }
}

export default handleFileChange