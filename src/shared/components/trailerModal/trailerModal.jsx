const TrailerModal = ({ youtubeKey, isOpen, onClose }) => {
  const getTrailerUrl = (youtubeKey) => {
    return `https://www.youtube.com/embed/watch?v=${youtubeKey}`;
  };

  return (
    <dialog open={isOpen} onClose={onClose}>
      <iframe
        width="560"
        height="315"
        src={getTrailerUrl(youtubeKey)}
        title="YouTube video player"
        allowFullScreen
      />
    </dialog>
  );
};

export default TrailerModal;
