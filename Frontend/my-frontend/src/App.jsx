import { useRef, useState } from 'react'
import './App.css'
import handleFileChange from './funcs/handleFileChange'
import togglePlayPause from './funcs/togglePlayPause';


function App() {
  const fileInputRef = useRef(null) // Reference to the hidden file input
  const [audioFile, setAudioFile] = useState(null); // State to hold the selected audio file
  const audioRef = useRef(null); // Reference to the audio element

  const UploadClick = () => {
    // Trigger the hidden file input click
    fileInputRef.current?.click()
  }

  return (
    <>
      <h1 id="media-player-heading">Media Player</h1>

      {/* Media Player Rectangle */}
      <div className="media-player-rectangle">
        {audioFile && (
          <p className="file-name">{audioFile.name}</p>
        )}
        {audioFile && (
          <audio
            ref={audioRef}
            src={URL.createObjectURL(audioFile)}
            type={audioFile.type}
          />
        )}

        {/* Three blue circles */}
        <div className="control-buttons">
          <button className="circle-button">⏮</button>
          <button className="circle-button" onClick={() => togglePlayPause(audioRef)}>⏯</button>
          <button className="circle-button">⏭</button>
        </div>
      </div>

       <input
          type="file"
          ref={fileInputRef}
          //onChange={handleFileChange}
         onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              if (file.type.startsWith('audio/')) {
                setAudioFile(file);
              } else {
                alert('Please upload a valid audio file!');
                e.target.value = ''; // reset the input
              }
            }
          }}

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