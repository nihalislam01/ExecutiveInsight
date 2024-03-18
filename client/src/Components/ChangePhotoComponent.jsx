import React, { useRef, useState } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import { useNavigate } from 'react-router-dom';
import { uploadPhotoApi } from './api/ExecutiveInsightApiService';
import { useAuth } from './security/AuthContext';

export default function ChangePhotoComponent() {
  const [croppedImage, setCroppedImage] = useState(null);
  const [height, setHeight] = useState('');
  const imageInputRef = useRef(null);
  const imagePreviewRef = useRef(null);
  const navigate = useNavigate();
  const authContext = useAuth();
  const username = authContext.username();
  let cropper;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    if (imagePreviewRef.current) {
        cropper = new Cropper(imagePreviewRef.current, {
          aspectRatio: 1,
          crop(event) {
            const canvas = cropper.getCroppedCanvas();
            setCroppedImage(canvas.toDataURL());
          }
        });
      }

    reader.onload = () => {
      const image = new Image();
      image.src = reader.result;
      image.onload = () => {
        const { width, height } = image;
        setHeight((600*height)/width)

        if (cropper) {
            cropper.replace(reader.result);
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const imageData = {
        image: croppedImage,
        email: username
    }
    uploadPhotoApi(imageData)
        .then((response) => navigate('/user-profile'))
        .catch((error) => navigate('/error'))
  };

  return (
        <div className='row justify-content-center'>
            <div style={{ height: `${height}px`, width: "600px" }}>
                <img ref={imagePreviewRef}></img>
            </div>
            <div>
                <input type="file" id="fileInput" accept="image/*" className='btn btn-success' style={{ display: 'none' }} ref={imageInputRef} onChange={handleImageChange} />
                <label htmlFor="fileInput" className='btn btn-secondary'>
                    Choose Photo
                </label>
                <button className='btn btn-success' onClick={handleSubmit}>Change Photo</button>
            </div>
        </div>
  );
}
