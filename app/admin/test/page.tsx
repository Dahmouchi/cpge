"use client";

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Using Axios for the file upload
      const response = await axios.post('/api/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Get the uploaded file URL from the response
      setUploadUrl(response.data.fileUrl);
      console.log(response.data.fileUrl)
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <br/>
      {uploadUrl && (
        <div>
          <h2>File uploaded successfully:</h2>
          <img src={uploadUrl} alt="Uploaded file" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
    </div>
  );
}
