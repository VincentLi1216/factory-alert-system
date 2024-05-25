import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const VideoStream = () => {
    
    const socket = io('http://localhost:5000');
    socket.on('video_frame', (data: { image: string }) => {
        setImageSrc(data.image);
    });
    socket.disconnect();

    return <img src={imageSrc} alt="Video Stream" style={{ width: '100%' }} />;
};

export default VideoStream;
