import { useRef, useState, useEffect } from 'react';
import './App.css';
import togglePlayPause from './funcs/togglePlayPause';

function App() {
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);
  const [audioFile, setAudioFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const UploadClick = () => fileInputRef.current?.click();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, []);

  return (
    <>
      <h1 id="media-player-heading">Media Player</h1>

      <div className="media-player-rectangle">
        {audioFile && <p className="file-name">{audioFile.name}</p>}

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Audio element stays mounted */}
        <audio ref={audioRef} controls={false} preload="auto" />

        {/* Control buttons */}
        <div className="control-buttons">
          <button className="circle-button">⏮</button>
          <button
            className="circle-button"
            onClick={() => togglePlayPause(audioRef)}
          >
            ⏯
          </button>
          <button className="circle-button">⏭</button>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            if (file.type.startsWith('audio/')) {
              setAudioFile(file);
              audioRef.current.src = URL.createObjectURL(file);
              audioRef.current.load();
            } else {
              alert('Please upload a valid audio file!');
              e.target.value = '';
            }
          }
        }}
        accept="audio/*"
        style={{ display: 'none' }}
      />

      <button id="upload-button" onClick={UploadClick}>
        Upload Audio File
      </button>
    </>
  );
}

export default App;
