import { useState, useEffect } from 'react'

export default function MetricsDashboard() {
  const [metrics, setMetrics] = useState([])

  useEffect(() => {
    // Listen for S3 upload metrics
    const handleMetrics = (event) => {
      if (event.detail?.type === 's3Upload') {
        setMetrics(prev => [event.detail.data, ...prev.slice(0, 9)])
      }
    }

    window.addEventListener('s3Metrics', handleMetrics)
    return () => window.removeEventListener('s3Metrics', handleMetrics)
  }, [])

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', margin: '20px' }}>
      <h3>S3 Performance Metrics</h3>
      {metrics.length === 0 ? (
        <p>No metrics yet</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>File</th>
              <th>Size</th>
              <th>Duration</th>
              <th>Throughput</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric, i) => (
              <tr key={i}>
                <td>{metric.fileName}</td>
                <td>{(metric.fileSize / 1024).toFixed(1)} KB</td>
                <td>{metric.uploadTime}</td>
                <td>{metric.throughput}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}