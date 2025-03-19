// product-inventory-client/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductTable from './components/ProductTable';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * App is the main component for the Product Inventory Management System.
 * It fetches the product list from the API and handles add, update, and delete operations.
 */
function App() {
  const [products, setProducts] = useState([]);         // List of products.
  const [loading, setLoading] = useState(true);           // Loading state.
  const [error, setError] = useState('');                 // Error message.
  const [editingProduct, setEditingProduct] = useState(null); // Product being edited.
  const [successMessage, setSuccessMessage] = useState(''); // Success notification.

  // Update this URL if necessary; must match the backend API URL.
  const API_URL = 'http://localhost:5175/api/Products';

  // Fetch the list of products from the API.
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching products.');
    } finally {
      setLoading(false);
    }
  };

  // Get products on component mount.
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handler to add a new product.
  const handleAddProduct = async (product) => {
    try {
      const response = await axios.post(API_URL, product);
      setProducts([...products, response.data]);
      setSuccessMessage('Product added successfully.');
      setError('');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data || 'Error adding product.');
    }
  };

  // Handler to delete a product.
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      setSuccessMessage('Product deleted successfully.');
      setError('');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data || 'Error deleting product.');
    }
  };

  // Begin editing a product.
  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  // Handler to update a product.
  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await axios.put(`${API_URL}/${updatedProduct.id}`, updatedProduct);
      setProducts(
        products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      setSuccessMessage('Product updated successfully.');
      setError('');
      setEditingProduct(null);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data || 'Error updating product.');
    }
  };

  // Cancel editing.
  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Product Inventory Management</h1>

      {loading && <div className="alert alert-info">Loading products...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {/* Show the edit form if a product is being edited; otherwise show the add form */}
      {editingProduct ? (
        <EditProductForm
          product={editingProduct}
          onUpdateProduct={handleUpdateProduct}
          onCancel={handleCancelEdit}
        />
      ) : (
        <AddProductForm onAddProduct={handleAddProduct} />
      )}

      <hr />

      {products.length > 0 ? (
        <ProductTable
          products={products}
          handleEdit={handleEditProduct}
          handleDelete={handleDeleteProduct}
        />
      ) : (
        !loading && <div>No products available.</div>
      )}
    </div>
  );
}

export default App;
