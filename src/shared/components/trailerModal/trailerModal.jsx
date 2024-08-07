import { forwardRef, useImperativeHandle } from "react";

import { X } from "lucide-react";
import "./trailerModal.scss";

const TrailerModal = forwardRef(({ movieTitle, youtubeVideoId, onClose }, ref) => {
  const getEmbedUrl = (videoId) => {
    return `https://www.youtube.com/embed/${videoId}`;
  };

  useImperativeHandle(ref, () => ({
    showModal: () => {
      ref.current?.showModal();
    }
  }));

  return (
    <dialog ref={ref} className="trailer-dialog">
      <div className="trailer-dialog__header">
        <span>{movieTitle}</span>
        <button onClick={onClose} className="trailer-dialog__close-button">
          <X />
        </button>
      </div>
      <iframe
        width="560"
        height="315"
        src={getEmbedUrl(youtubeVideoId)}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </dialog>
  );
});

export default TrailerModal;