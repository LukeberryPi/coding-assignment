import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";

import { X } from "lucide-react";
import "./trailerModal.scss";

const TrailerModal = forwardRef(({ movieTitle, youtubeVideoId, onClose, isOpen }, ref) => {
  const dialogRef = useRef(null);

  const getEmbedUrl = (videoId) => {
    return `https://www.youtube.com/embed/${videoId}`;
  };

  useImperativeHandle(ref, () => ({
    showModal: () => {
      dialogRef.current?.showModal();
    },
    close: () => {
      dialogRef.current?.close();
    }
  }));

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (isOpen && !dialogElement.open) {
      dialogElement.showModal();
    } else if (!isOpen && dialogElement.open) {
      dialogElement.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  return (
    <dialog ref={dialogRef} className="trailer-dialog">
      <div className="trailer-dialog__header">
        <p>{movieTitle}</p>
        <button onClick={handleClose} className="trailer-dialog__close-button">
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