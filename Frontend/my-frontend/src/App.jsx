import { useState, useRef  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const fileInputRef = useRef(null) // Reference to the hidden file input

  const UploadClick = () => {
    // Trigger the hidden file input click
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Check if it's an audio file
      if (file.type.startsWith('audio/')) {
        console.log('Selected Audio File:', file.name)
      } else {
        alert('Please Select an Audio File')
        // Reset the input
        event.target.value = ''
      }
    }
  }

  return (
    <>
      <h1 id="media-player-heading">Media Player</h1>

      {/* Media Player Rectangle */}
      <div className="media-player-rectangle">
        {}
      </div>

       <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="audio/*" // Only allow audio files
          style={{ display: 'none' }} // Hide the actual file input
        />

       <button id="upload-button" onClick={UploadClick}>
          Upload Audio File
      </button>
    </>
  )
}

export default App
