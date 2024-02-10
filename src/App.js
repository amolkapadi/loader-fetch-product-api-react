import React, { useState, useEffect } from 'react';
import { Vortex } from 'react-loader-spinner'; // Import Vortex loader type
import './App.css';

const App = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProductData(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  return (
    <div className="app-container">
      {loading ? (
        <div className="loader-container">
          <Vortex type="Vortex" color="#4fa94d" height={80} width={80} visible={loading} />
        </div>
      ) : (
        <div className='container py-5'>
          <h1 style={{ textAlign: 'center', marginTop: '40px' }}>Product Data</h1>
          <div className="row row-cols-1 row-cols-md-3 g-4 py-5">
            {productData.map((product) => (
              <div key={product.id} className="col">
                <div className="card">
                  <img src={product.image} className="card-img-top" alt={product.title} />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description.substring(1, 45)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div class="row row-cols-1 row-cols-md-3 g-4">

          </div>
        </div>
      )}
    </div>
  );
};

export default App;
