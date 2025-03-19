import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, deleteProduct } from "../redux/actions/productActions";

// Component to display the list of products fetched from the backend API.
const ProductList = () => {
  // Extract products, loading and error state from Redux store.
  const { products, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  // On component mount, dispatch the fetchProducts action.
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle deletion of a product.
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div>
      <h2>Product List</h2>
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {products && products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id} style={{ marginBottom: "10px" }}>
              <strong>{product.name}</strong> - {product.description} - $
              {product.price.toFixed(2)}
              <button onClick={() => handleDelete(product.id)} style={{ marginLeft: "10px" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
