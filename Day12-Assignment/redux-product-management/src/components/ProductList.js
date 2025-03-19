import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addToWishlist } from '../redux/actions/productActions';

/**
 * ProductList Component
 * Fetches products from the API and displays them in a responsive grid.
 * Allows users to add a product to the wishlist.
 */
const ProductList = () => {
  const dispatch = useDispatch();

  // Access product state (loading, products, error) from Redux
  const { loading, products, error } = useSelector(state => state.product);

  // Access wishlist to disable add button if product exists in wishlist
  const wishlist = useSelector(state => state.wishlist);

  // On component mount, fetch products via the Redux thunk action
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  /**
   * Checks if a product is already in the wishlist.
   * @param {Object} product - The product object.
   * @returns {boolean} - True if in wishlist, false otherwise.
   */
  const isInWishlist = (product) => wishlist.some(item => item.id === product.id);

  /**
   * Dispatches action to add a product to the wishlist.
   * @param {Object} product - The product to add.
   */
  const handleAddToWishlist = (product) => {
    if (!isInWishlist(product)) {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {loading && <p>Loading products...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      <div className="row">
        {products && products.map(product => (
          <div key={product.id} className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.title}
                style={{ height: "250px", objectFit: "contain" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => handleAddToWishlist(product)}
                  disabled={isInWishlist(product)}
                >
                  {isInWishlist(product) ? "Added" : "Add to Wishlist ❤️"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
