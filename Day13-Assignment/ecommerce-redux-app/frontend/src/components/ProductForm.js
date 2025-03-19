import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/actions/productActions";

// Component for adding a new product via a form.
const ProductForm = () => {
  // Component-level state for form inputs.
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const dispatch = useDispatch();

  // Handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new product object from form values.
    const newProduct = {
      name,
      description,
      price: parseFloat(price),
    };

    // Dispatch addProduct action.
    dispatch(addProduct(newProduct));

    // Reset form values.
    setName("");
    setDescription("");
    setPrice("");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price: </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
