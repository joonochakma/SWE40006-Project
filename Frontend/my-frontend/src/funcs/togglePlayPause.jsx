const togglePlayPause = (audioRef) => {
  const audio = audioRef.current;
  if (!audio) return;

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
};

export default togglePlayPause;
