import React, { useState, useRef } from 'react';
import './dashboard.scss';
import ReactPlayer from 'react-player';
import { toast } from 'react-toastify';
import axios from 'axios';
import {BsFillPlusCircleFill} from 'react-icons/bs';
import Sidebar from '../../component/sidebar/Sidebar';
import { BiImageAdd } from 'react-icons/bi';

const Dashboard = () => {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [watermarkImage, setWatermarkImage] = useState(null); // State for watermark image
  const watermarkInputRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [watermarkText, setWatermarkText] = useState("");
  const [watermarkPosition, setWatermarkPosition] = useState({ x: 0, y: 0 });
  const [watermarkDragging, setWatermarkDragging] = useState(false);
  const [watermarkSize, setWatermarkSize] = useState(50);; // Initial size of watermark
  //new stuffs

  const [filterValue, setFilterValue] = useState(0); // Initial value for the filter
  

  

 
  const handleWatermarkSizeChange = (event) => {
    setWatermarkSize(parseInt(event.target.value));
  };
  const handleVideoChange = (event) => {
    setSelectedVideo(event.target.files[0]);
    setVideoUrl(URL.createObjectURL(event.target.files[0])); // Set the video URL
  };

  const handleSaveAudio = async () => {
    if (!selectedVideo) {
      toast.error('Please select a video before saving the audio.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('video', selectedVideo);

      const response = await axios.post(
        'http://localhost:8080/api/audio/downloadaudio',
        formData,
        {
          responseType: 'blob', // Set the response type to blob
          withCredentials: true,
        }
      );

      const audioBlob = response.data; // Blob containing the audio data

      // Create a download link for the audio blob
      const audioUrl = URL.createObjectURL(audioBlob);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = audioUrl;
      downloadAnchor.download = 'extracted_audio.mp3'; // Set the desired filename
      downloadAnchor.click();

      toast.success('Audio file saved successfully.');
    } catch (error) {
      console.error('Error saving audio:', error);
      toast.error('Failed to save audio file.');
    }
  };

  const handleWatermarkTextChange = (event) => {
    setWatermarkText(event.target.value);
  };

  const handleWatermarkDragStart = (e) => {
    e.preventDefault();
    // Prevent default behavior that interferes with drag-and-drop
  };

  const handleWatermarkDrag = (e) => {
    if (!watermarkDragging) {
      setWatermarkDragging(true);
      return;
    }

    const newPositionX = e.clientX - e.target.width / 2;
    const newPositionY = e.clientY - e.target.height / 2;

    setWatermarkPosition({ x: newPositionX, y: newPositionY });
  };

  const handleWatermarkDragEnd = () => {
    setWatermarkDragging(true);
  };

 
  

  const handleAddWatermark = async () => {
    if (!selectedVideo || !watermarkText) {
      toast.error("Please select a video and provide a watermark text");
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedVideo); // Make sure 'video' matches the key used in the backend
    formData.append('watermarkText', watermarkText);

    try {
      await axios.post(`http://localhost:8080/api/addwatermark`, formData, {
        withCredentials: true,
      });
      toast.success('Watermark added successfully');
    } catch (error) {
      console.error("Error adding watermark:", error);
      toast.error("Failed to add watermark to the video");
    }
  };

  const handleImageDropCallback = (imageFile) => {
    const imageUrl = URL.createObjectURL(imageFile);
    setWatermarkImage(imageUrl);
  };

  const handleWatermarkInputChange = (e) => {
    e.preventDefault();
    const imageFile = e.target.files[0];
    if (imageFile) {
      handleImageDropCallback(imageFile);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    // Parse video ID from the YouTube link
    const videoId = extractVideoId(youtubeLink);

    // Generate the video URL using the YouTube API
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      setVideoUrl(embedUrl);
    }
  };

  const extractVideoId = (link) => {
    try {
      const url = new URL(link);
      const searchParams = new URLSearchParams(url.search);
      const videoId = searchParams.get('v');
      return videoId;
    } catch (error) {
      console.error('Error extracting video ID:', error);
      return null;
    }
  };

  const handleSaveVideo = async () => {
    if (!selectedVideo || !watermarkImage) {
      toast.error("Please select a video and provide a watermark image");
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedVideo);
    formData.append('watermarkImage', watermarkImage);
    formData.append('watermarkPositionX', watermarkPosition.x);
    formData.append('watermarkPositionY', watermarkPosition.y);
    
    try {
      // Make a POST request to the server to save the watermarked video
      await axios.post(
        'http://localhost:8080/api/addwatermark',
        formData,
        {
          withCredentials: true,
        }
      );

      // Trigger a GET request to download the watermarked video
      const downloadUrl = 'http://localhost:8080/api/audio/downloadaudio/editedvideo';
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = downloadUrl;
      downloadAnchor.download = 'watermarked_video.mp4'; // Set the desired filename
      downloadAnchor.click();
    } catch (error) {
      console.error('Error saving watermarked video:', error);
    }
  };

  const handleSaveEditedVideo = async () => {
    if (!selectedVideo || !watermarkImage) {
      toast.error("Please select a video and provide a watermark image");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('video', selectedVideo);
      formData.append('watermarkImage', watermarkImage);
      formData.append('watermarkPositionX', watermarkPosition.x);
      formData.append('watermarkPositionY', watermarkPosition.y);
  
      // Make a POST request to save the edited video with watermark
      await axios.post(
        'http://localhost:8080/api/addwatermark',
        formData,
        {
          withCredentials: true,
        }
      );
  
      // Trigger a GET request to download the edited watermarked video
      const downloadUrl = 'http://localhost:8080/api/addwatermark/download';
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = downloadUrl;
      downloadAnchor.download = 'edited_watermarked_video.mp4'; // Set the desired filename
      downloadAnchor.click();
  
      toast.success('Edited video with watermark saved successfully.');
    } catch (error) {
      console.error('Error saving edited watermarked video:', error);
      toast.error('Failed to save edited video with watermark.');
    }
  };
  
  return (
    <Sidebar handleSaveAudio={handleSaveAudio} watermarkSize={watermarkSize}
    handleWatermarkSizeChange={handleWatermarkSizeChange}>
    <div>
      <div className="dashboard">
        <h2>Youtube Video Editor!</h2>
        <form>
          <div className="form-control">
            <input type="file" accept="video/*" onChange={handleVideoChange} />
            <input
              type="text"
              placeholder="Enter youtube link..."
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
            />
            <button onClick={handleGenerate}>Generate</button>
          </div>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={watermarkInputRef}
            onChange={handleWatermarkInputChange}
          />
        </form>
      </div>
      {videoUrl && (
        <div className="video-player">
          <ReactPlayer
            url={videoUrl}
            width="700px"
            height="600px"
            controls
            playing
            loop={false}
            config={{
              file: {
                attributes: {
                  crossOrigin: 'anonymous',
                },
              },
            }}
            style={{
              position: 'relative',
            }}
          />
          {watermarkImage && (
            <div
              className="watermark-container"
              style={{
                position: 'absolute',
                top: watermarkPosition.y,
                left: watermarkPosition.x,
                cursor: 'grab',
                zIndex: 1000,
              }}
              draggable // Add the draggable attribute
              onDragStart={handleWatermarkDragStart}
              onDrag={handleWatermarkDrag}
              onDragEnd={handleWatermarkDragEnd}
            >
              <img
  src={watermarkImage}
  alt="Watermark"
  className="watermark-image"
  style={{
    width: `${watermarkSize}px`, // Use the watermarkSize state here
    height: `${watermarkSize}px`, // Use the watermarkSize state here
    objectFit: 'cover',
  }}
/>
            </div>
          )}
        </div>
      )}
      <div className='tools'>
        <input 
        style={{
          marginLeft:'10px',
          marginTop:'10px',
          marginBottom:'10px'
        }}
          type="text"
          placeholder="Watermark Text"
          value={watermarkText}
          onChange={handleWatermarkTextChange}
        />
        <BsFillPlusCircleFill onClick={handleAddWatermark} size={20} color='orangered' style={{
          marginTop:'10px'
        }} />
       
      
        <button onClick={() => watermarkInputRef.current.click()} className='--btn --btn-primary'>
        <BiImageAdd/> add image
        </button>
    <div style={{
      marginLeft:'1rem'
    }}>
      <label>Increase image</label>
        <input
  type="range"
  min="100"
  max="500" // You can adjust the range as needed
  step="10"
  value={watermarkSize}
  onChange={handleWatermarkSizeChange}
/>
</div>
{/* <button onClick={handleSaveVideo} className='--btn'>Save Video with Watermark</button> */}
<button onClick={handleSaveAudio} className='--btn --btn-primary'>Save Audio File</button>
<button onClick={handleSaveEditedVideo} className='--btn --btn-primary'>save edited video</button>
      </div>
     
      <div>
     
       
        {/* <button onClick={handleClick}>cliick!</button>
       <div
        className="container"
        style={{
          background: 'red',
          height: '40px',
          width: `${width}%`,
          transition: 'width 0.3s', // Add a smooth transition effect
        }}
      ></div> */}
      </div>

    </div>
    </Sidebar>
  );
};

export default Dashboard;
