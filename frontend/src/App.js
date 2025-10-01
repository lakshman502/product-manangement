import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/products?sort=${sortBy}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Search products
  const searchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('name', searchTerm);
      if (categoryFilter) params.append('category', categoryFilter);
      
      const response = await fetch(`http://localhost:8080/api/products/search?${params}`);
      if (!response.ok) {
        throw new Error('Failed to search products');
      }
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to search products. Please try again.');
      console.error('Error searching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new product
  const addProduct = async (productData) => {
    try {
      const isFormData = productData instanceof FormData;
      const response = await fetch(`http://localhost:8080/api/products${isFormData ? '/multipart/create' : ''}`, {
        method: 'POST',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? productData : JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const newProduct = await response.json();
      setProducts([...products, newProduct]);
      setSuccess('Product added successfully!');
      setShowForm(false);
      setEditingProduct(null);
    } catch (err) {
      setError('Failed to add product. Please try again.');
      console.error('Error adding product:', err);
    }
  };

  // Update product
  const updateProduct = async (id, productData) => {
    try {
      const isFormData = productData instanceof FormData;
      const response = await fetch(`http://localhost:8080/api/products/${id}${isFormData ? '/multipart' : ''}`, {
        method: 'PUT',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? productData : JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updatedProduct = await response.json();
      setProducts(products.map(p => p.id === id ? updatedProduct : p));
      setSuccess('Product updated successfully!');
      setShowForm(false);
      setEditingProduct(null);
    } catch (err) {
      setError('Failed to update product. Please try again.');
      console.error('Error updating product:', err);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts(products.filter(p => p.id !== id));
      setSuccess('Product deleted successfully!');
    } catch (err) {
      setError('Failed to delete product. Please try again.');
      console.error('Error deleting product:', err);
    }
  };

  // Handle form submission
  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
  };

  // Handle edit product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // Handle sort change
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  // Handle search
  const handleSearch = () => {
    if (searchTerm || categoryFilter) {
      searchProducts();
    } else {
      fetchProducts();
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setCategoryFilter('');
    fetchProducts();
  };

  // Clear messages
  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  // Load products on component mount and when sort changes
  useEffect(() => {
    fetchProducts();
  }, [sortBy]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(clearMessages, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>Product Management System</h1>
          <p>Manage your products with ease</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
            <button onClick={clearMessages} style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            {success}
            <button onClick={clearMessages} style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
          </div>
        )}

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          onSearch={handleSearch}
          onClear={clearSearch}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Products ({products.length})</h2>
          <button 
            className="btn btn-success" 
            onClick={() => {
              setShowForm(true);
              setEditingProduct(null);
            }}
          >
            Add New Product
          </button>
        </div>

        {showForm && (
          <ProductForm
            product={editingProduct}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        )}

        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <ProductList
            products={products}
            onEdit={handleEditProduct}
            onDelete={deleteProduct}
          />
        )}
      </div>
    </div>
  );
}

export default App;
