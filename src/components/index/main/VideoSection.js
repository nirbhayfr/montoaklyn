import React from "react";

const VideoSection = () => {
  return (
    <div className="ul-container">
      <div className="ul-video">
        <div>
          <img
            src="assets/img/video-banner.jpg"
            alt="Video Banner"
            className="ul-video-cover"
          />
        </div>
        <a
          href="https://youtu.be/cNOKQIw81SE?si=iwUyBvpTD3h8DpFK"
          data-fslightbox="video"
          className="ul-video-btn"
        >
          <i className="flaticon-play-button-arrowhead"></i>
        </a>
      </div>
    </div>
  );
};

export default VideoSection;
