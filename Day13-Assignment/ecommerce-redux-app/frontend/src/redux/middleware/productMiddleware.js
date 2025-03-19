// Custom middleware to log product-related actions for debugging purposes.
const productMiddleware = (store) => (next) => (action) => {
    // Log only actions whose type contains "PRODUCT".
    if (action.type && action.type.includes("PRODUCT")) {
      console.log("[Product Middleware] Action dispatched:", action.type);
    }
    return next(action);
  };
  
  export default productMiddleware;
  