// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import CardList from './components/CardList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserDTO } from './components/Card';

const App: React.FC = () => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  return (
    <div className="App">
      <Header setUsers={setUsers} />
      <CardList setUsers={setUsers} users={users}/>
      <ToastContainer />
    </div>
  );
};

export default App;
