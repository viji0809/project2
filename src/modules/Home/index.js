import React, { useEffect, useState } from 'react';
import Hero from '../../components/Hero';
import FeatureCard from '../../components/FeatureCard';
import Products from '../../components/Products';  // Correct path

import Stats from '../../components/StatCard';

const Home = () => {
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
   }, []); // Empty dependency array to run only on component mount

    return (
        <>
        <Hero />
        <div className="flex flex-col text-center w-full mt-20">
            <h2 className="text-xs text-pink-500 tracking-widest font-medium title-font mb-1">PRODUCTS</h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">MOST POPULAR PRODUCTS</h1>
        </div>

        {/* Conditional rendering based on loading state */}
        {loading ? (
            <div>Loading...</div> // Show loading message while fetching data
        ) : (
            <Products products={products} /> // Show products after data is fetched
        )}

        <FeatureCard />
        <Stats />
        </>
    );
};

export default Home;
