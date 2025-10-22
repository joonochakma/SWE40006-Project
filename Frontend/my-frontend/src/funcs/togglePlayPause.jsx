const togglePlayPause = (audioRef) => {
  if (audioRef.current) {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }
};

export default togglePlayPause;