// product-inventory-client/src/components/ProductTable.js

import React from 'react';
import PropTypes from 'prop-types';

/**
 * ProductTable displays the list of products in a table.
 * Props:
 *  - products: array of product objects.
 *  - handleEdit: function to trigger editing a product.
 *  - handleDelete: function to delete a product.
 */
const ProductTable = ({ products, handleEdit, handleDelete }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>
              <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(product)}>
                Edit
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

ProductTable.propTypes = {
  products: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ProductTable;
