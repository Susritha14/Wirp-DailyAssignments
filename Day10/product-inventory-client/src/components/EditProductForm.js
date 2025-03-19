// product-inventory-client/src/components/EditProductForm.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * EditProductForm renders a pre-filled form for editing a product.
 * Props:
 *  - product: product object to be edited.
 *  - onUpdateProduct: function to update the product data.
 *  - onCancel: function to cancel editing.
 */
const EditProductForm = ({ product, onUpdateProduct, onCancel }) => {
  const [name, setName] = useState(product ? product.name : '');
  const [price, setPrice] = useState(product ? product.price : '');
  const [error, setError] = useState('');

  // Update form fields when the product prop changes.
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate fields.
    if (name.trim() === '' || price === '' || parseFloat(price) <= 0) {
      setError('Please provide valid product details.');
      return;
    }
    setError('');
    // Call update handler.
    onUpdateProduct({ ...product, name: name.trim(), price: parseFloat(price) });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h5>Edit Product</h5>
      <div className="mb-3">
        <label>Product Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Price</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button type="submit" className="btn btn-success me-2">
        Update
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

EditProductForm.propTypes = {
  product: PropTypes.object,
  onUpdateProduct: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditProductForm;
