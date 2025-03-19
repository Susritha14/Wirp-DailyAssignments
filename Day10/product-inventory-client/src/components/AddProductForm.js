// product-inventory-client/src/components/AddProductForm.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * AddProductForm renders a form to add a new product.
 * Props:
 *  - onAddProduct: function that receives a product object when the form is submitted.
 */
const AddProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  // Handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate input fields.
    if (name.trim() === '' || price === '' || parseFloat(price) <= 0) {
      setError('Please provide valid product name and price.');
      return;
    }
    setError('');
    // Call parent handler.
    onAddProduct({ name: name.trim(), price: parseFloat(price) });
    // Clear form.
    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Product Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter product name"
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
          placeholder="Enter product price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button type="submit" className="btn btn-primary">
        Add Product
      </button>
    </form>
  );
};

AddProductForm.propTypes = {
  onAddProduct: PropTypes.func.isRequired,
};

export default AddProductForm;
