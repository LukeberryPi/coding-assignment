// TrailerModal.js

import React from "react";

import "./trailerModal.scss";
import { X } from "lucide-react";

const TrailerModal = ({ movieTitle, youtubeVideoId, isOpen, onClose }) => {
  const getEmbedUrl = (videoId) => {
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <dialog className="trailer-dialog">
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
};

export default TrailerModal;
