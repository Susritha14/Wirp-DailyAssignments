

import React, { useState, useEffect } from 'react';


const ProductList = () => {
  
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize] = useState(10); // Page size fixed at 10
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  const fetchProducts = async (page) => {
    setLoading(true);
    setError('');
    try {
      
      const response = await fetch(`http://localhost:5008/api/products?page=${page}&size=${pageSize}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products. Please try again later.');
      }
      
      
      const result = await response.json();

      
      setProducts(result.data);
      setCurrentPage(result.pagination.currentPage);
      setTotalPages(result.pagination.totalPages);
      setTotalRecords(result.pagination.totalRecords);
    } catch (err) {
      
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect hook triggers data fetch on initial mount and when the currentPage changes.
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

 
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Render the products table only when not loading and no error */}
      {!loading && !error && (
        <>
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price ($)</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No products available.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div style={{ marginTop: '10px' }}>
            <button onClick={handlePrevious} disabled={currentPage === 1}>
              Previous
            </button>
            <span style={{ margin: '0 15px' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
          <p>Total Records: {totalRecords}</p>
        </>
      )}
    </div>
  );
};

export default ProductList;
