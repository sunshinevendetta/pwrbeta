import React from 'react';

const VideoBackground2 = () => {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
        <source src="/images/cloud.mp4" type="video/mp4"/>
      </video>
    </div>
  );
};

export default VideoBackground2;
