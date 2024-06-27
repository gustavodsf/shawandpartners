// src/components/Search.tsx
import React from 'react';

interface SearchProps {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: () => void;
}

const Search: React.FC<SearchProps> = ({ query, setQuery, handleSearch }) => {
  return (
    <div>
      <input
        type="text"
        value={query}
        id='search-input'
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
