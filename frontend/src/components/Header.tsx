// src/components/Header.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Search from './Search';
import Upload from './Upload';
import './Header.css'; // Import the CSS file
import { UserDTO } from './Card';

interface HeaderProps {
  setUsers: (users: UserDTO[]) => void;
}

const Header: React.FC<HeaderProps> = ({ setUsers }) => {
  const [query, setQuery] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/users`, { params: { q: query } });
      setUsers(data.data);  // Handle the response data
      toast.success('Search successful!');
    } catch (error) {
      toast.error('Error fetching users');
    }
  };

  return (
    <header className="header">
      <div className="search">
        <Search query={query} setQuery={setQuery} handleSearch={handleSearch} />
      </div>
      <div className="upload">
        <Upload backendUrl={backendUrl} setUsers={setUsers}/>
      </div>
    </header>
  );
};

export default Header;
