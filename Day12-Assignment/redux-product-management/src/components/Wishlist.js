import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../redux/actions/productActions';

/**
 * Wishlist Component
 * Displays products added to the wishlist and allows removal.
 */
const Wishlist = () => {
  const dispatch = useDispatch();

  // Grab wishlist state from Redux store
  const wishlist = useSelector(state => state.wishlist);

  /**
   * Dispatches the removal of a product from the wishlist.
   * @param {number} productId - The unique id of the product to remove.
   */
  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  return (
    <div>
      <h2>My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="row">
          {wishlist.map(product => (
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
                    className="btn btn-danger mt-auto"
                    onClick={() => handleRemoveFromWishlist(product.id)}
                  >
                    Remove ❌
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
