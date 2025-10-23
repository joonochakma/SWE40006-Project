import { useRef, useState, useEffect } from 'react';
import './App.css';
import togglePlayPause from './funcs/togglePlayPause';

function App() {
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);
  const [audioFile, setAudioFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const UploadClick = () => fileInputRef.current?.click();

  // Helper: Convert seconds → mm:ss
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // Update progress & duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };

    const setAudioDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
    };
  }, []);

  // Handle user clicking/dragging on progress bar
  const handleSeek = (e) => {
    const audio = audioRef.current;
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const seekTime = (clickX / width) * audio.duration;
    audio.currentTime = seekTime;
    setProgress((seekTime / audio.duration) * 100);
  };

  return (
    <>
      <h1 id="media-player-heading">Media Player</h1>

      <div className="media-player-rectangle">
        {audioFile && <p className="file-name">{audioFile.name}</p>}

        {/* Seekable Progress Bar */}
        <div className="progress-bar" onClick={handleSeek}>
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Time Display */}
        {audioFile && (
          <p className="time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        )}

        {/* Audio Element */}
        <audio ref={audioRef} controls={false} preload="auto" />

        {/* Control Buttons */}
        <div className="control-buttons">
          <button
            className="circle-button"
            onClick={() => togglePlayPause(audioRef)}
          >
            ⏯
          </button>
        </div>
      </div>

      {/* File Upload */}
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
