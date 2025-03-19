import React from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

// Main App component that combines the product form and list.
const App = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>E-Commerce Product Management</h1>
      <ProductForm />
      <ProductList />
    </div>
  );
};

export default App;
