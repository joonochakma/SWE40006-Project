import { useState, useRef  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import handleFileChange from './funcs/handleFileChange'

function App() {
  const fileInputRef = useRef(null) // Reference to the hidden file input

  const UploadClick = () => {
    // Trigger the hidden file input click
    fileInputRef.current?.click()
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