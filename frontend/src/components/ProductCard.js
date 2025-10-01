import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>{product.name}</h3>
        <span className="price">{formatPrice(product.price)}</span>
      </div>
      <div className="card-body">
        {product.id && (
          <div style={{ marginBottom: '0.75rem' }}>
            <img
              src={`http://localhost:8080/api/products/${product.id}/image`}
              alt={product.name}
              style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '6px' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        )}
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn btn-secondary" 
            onClick={() => onEdit(product)}
            style={{ flex: 1 }}
          >
            Edit
          </button>
          <button 
            className="btn btn-danger" 
            onClick={() => onDelete(product.id)}
            style={{ flex: 1 }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
