const TrailerModal = ({ youtubeVideoId, isOpen, onClose }) => {
  const getEmbedUrl = (videoId) => {
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <dialog
      style={{
        padding: "1rem",
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      open={isOpen}
    >
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button onClick={onClose} style={{ backgroundColor: "transparent", border: "none" }}>
          <i className="bi bi-x h3" />
        </button>
      </div>
      <iframe
        width="560"
        height="315"
        src={getEmbedUrl(youtubeVideoId)}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </dialog>
  );
};

export default TrailerModal;
