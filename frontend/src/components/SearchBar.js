import React from 'react';

const SearchBar = ({ 
  searchTerm, 
  setSearchTerm, 
  categoryFilter, 
  setCategoryFilter, 
  sortBy, 
  onSortChange, 
  onSearch, 
  onClear 
}) => {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleClear = () => {
    setSearchTerm('');
    setCategoryFilter('');
    onClear();
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearchSubmit}>
        <div className="search-controls">
          <div className="form-group">
            <label htmlFor="search">Search by Name</label>
            <input
              type="text"
              id="search"
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter product name..."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Filter by Category</label>
            <input
              type="text"
              id="category"
              className="form-control"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              placeholder="Enter category..."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="sort">Sort by</label>
            <select
              id="sort"
              className="form-control"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="">Default</option>
              <option value="price">Price (Low to High)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>&nbsp;</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" className="btn">
                Search
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
