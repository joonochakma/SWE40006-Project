import { useState } from 'react'
import { uploadToS3 } from './services/s3Upload'

export default function TestS3Upload() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState('')

  const handleUpload = async () => {
    if (!file) return
    
    setUploading(true)
    try {
      const url = await uploadToS3(file)
      setResult(`✅ Success: ${url}`)
    } catch (error) {
      setResult(`❌ Error: ${error.message}`)
    }
    setUploading(false)
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>S3 Upload Test</h3>
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files[0])} 
      />
      <button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? 'Uploading...' : 'Test Upload'}
      </button>
      {result && <div style={{ marginTop: '10px', wordBreak: 'break-all' }}>{result}</div>}
    </div>
  )
}