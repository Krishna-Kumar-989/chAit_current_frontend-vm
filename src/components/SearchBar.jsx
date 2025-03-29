import React, { useState } from 'react';



const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };


  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        style={styles.searchInput}
      />
      
    
        </div>
  );
};

const styles = {
  searchInput: {
    padding: '8px',
    fontSize: '16px',
    width: '300px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  itemList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  item: {
    padding: '8px',
    borderBottom: '1px solid #ccc',
  },
};

export default SearchBar;
