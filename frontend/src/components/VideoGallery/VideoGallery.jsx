import React, { useRef } from "react";
import "./VideoGallery.css";
import videos from "../../assets/assets"; // Import the videos

const VideoGallery = () => {
  const videoRefs = Array(5).fill().map(() => useRef(null)); // Create refs for each video

  return ( 
    <div className="title">
      <hr/>
    <h1>The Craft of Brilliance: A Luxurious Showcase</h1>
    <div className="video-gallery">
      {/* Vertical Video on the Left */}
      <div className="video-container vertical">
        <video 
          ref={videoRefs[0]} 
          muted 
          onMouseEnter={() => videoRefs[0].current.play()} 
          onMouseLeave={() => videoRefs[0].current.pause()}
        >
          <source src={videos.video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Right Side - 4 Landscape Videos */}
      <div className="video-grid">
        {[videos.video2, videos.video3, videos.video4, videos.video5].map((videoSrc, index) => (
          <div key={index} className="video-container landscape">
            <video 
              ref={videoRefs[index + 1]} 
              muted 
              onMouseEnter={() => videoRefs[index + 1].current.play()} 
              onMouseLeave={() => videoRefs[index + 1].current.pause()}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default VideoGallery;
