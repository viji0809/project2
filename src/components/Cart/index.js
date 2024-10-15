import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
  const [carts, setCartItems] = useState([]);
  const [products, setProducts] = useState([]); // For storing product data
  const [loading, setLoading] = useState(true); // For tracking loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const response = await fetch('https://fakestoreapi.com/products?limit=12');
        const data = await response.json();
        console.log(data);
        setProducts(data); // Update the product state with the fetched data
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchProducts();
  }, []); 

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart");
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleInc = (id) => {
    const updatedCart = carts.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart); // Update the state with the new cart
  };

  const handleDec = (id) => {
    const updatedCart = carts.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    }).filter(item => item.quantity > 0); // Ensure you do not keep items with zero quantity

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart); // Update the state with the new cart
  };

  const removeProduct = (id) => {
    const updatedCart = carts.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart); // Update the state with the new cart
  };

  const calculateTotal = () => {
    return carts.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{carts.length} Items</h2>
          </div>

          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
          </div>

          {carts.map(item => {
            // Find the corresponding product from the products array
            const product = products.find(prod => prod.id === item.id);
            return (
              <div key={item.id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-2/5">
                  <div className="w-20">
                    <img
                      className="h-24"
                      src={product ? product.image : "https://via.placeholder.com/150"} // Use product image if available
                      alt={item.title}
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }} // Fallback image
                    />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{item.title}</span>
                    <span className="text-red-500 text-xs">{item.category}</span> {/* Assuming a category exists */}
                    <button onClick={() => removeProduct(item.id)} className="font-semibold hover:text-red-500 text-gray-500 text-xs">
                      Remove
                    </button>
                  </div>
                </div>

                <div className="flex justify-center w-1/5">
                  <button 
                    onClick={() => handleDec(item.id)} 
                    disabled={item.quantity <= 1}
                    className="border px-2 rounded hover:bg-gray-200"
                  >
                    <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </button>
                  <input
                    className="mx-2 border text-center w-8"
                    type="text"
                    value={item.quantity}
                    readOnly
                  />
                  <button 
                    onClick={() => handleInc(item.id)} 
                    className="border px-2 rounded hover:bg-gray-200"
                  >
                    <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </button>
                </div>

                <span className="text-center w-1/5 font-semibold text-sm">${item.price.toFixed(2)}</span>
                <span className="text-center w-1/5 font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            );
          })}

          <Link to={'/products'} className="flex font-semibold text-indigo-600 text-sm mt-10">
            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary Section */}
        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items {carts.length}</span>
            <span className="font-semibold text-sm">${calculateTotal().toFixed(2)}</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $10.00</option>
            </select>
          </div>
          <div className="py-10">
            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
            <input type="text" id="promo" className="border p-2 w-full text-sm" />
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 text-sm text-white uppercase">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
