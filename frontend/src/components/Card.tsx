// src/components/Card.tsx
import React from 'react';
import './Card.css';

import './Card.css';

export type UserDTO = {
  name: string
  city: string
  country: string
  favorite_sport: string
}

interface CardProps {
  user: UserDTO;
}

const Card: React.FC<CardProps> = ({ user }) => {
  return (
    <div  className="card info-card" key={user.name}>
      <h3>{user.name}</h3>
      <p>City: {user.city}</p>
      <p>Country: {user.country}</p>
      <p>Favorite Sport: {user.favorite_sport}</p>
    </div>
  );
};

export default Card;
