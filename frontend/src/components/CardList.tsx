// src/components/CardList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card, { UserDTO } from './Card';

import './CardList.css';
import { fetchAllUsers } from './service';

interface CardListProps {
  users: UserDTO[];
  setUsers: (users: UserDTO[]) => void;
}

const CardList: React.FC<CardListProps> = ({ users, setUsers }) => {
  const backendUrl = import.meta.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

  useEffect(() => {
    fetchAllUsers().then((users) => setUsers(users));
  }, [backendUrl]);

  return (
    <div className="card-list">
      {users.map((user: any) => (
        <Card key={user.id} user={user} />
      ))}
    </div>
  );
};

export default CardList;
