// src/components/Upload.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchAllUsers } from './service';
import { UserDTO } from './Card';

interface UploadProps {
  backendUrl: string;
  setUsers: (users: UserDTO[]) => void;
}

const Upload: React.FC<UploadProps> = ({ backendUrl, setUsers }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${backendUrl}/api/files`, formData);
      toast.success('File uploaded successfully!');
      setIsModalOpen(false);
      const users = await fetchAllUsers()
      setUsers(users);
    } catch (error) {
      toast.error('Error uploading file');
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Upload File</button>
      {isModalOpen && (
        <div className="modal">
          <input type="file" onChange={handleFileChange}/>
          <button id='upload-button'onClick={handleUpload}>Upload</button>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Upload;
