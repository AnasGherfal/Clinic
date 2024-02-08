import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import './Loading.css'; 

const LoadingScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading by setting a timeout
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout as needed

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="loading-screen">
      {loading ? (
        <div className="loading-spinner">
          {/* Use the ClipLoader spinner */}
          <ClipLoader color="#007bff" loading={loading} size={50} />
          Loading...
        </div>
      ) : (
        <div className="content">
          <h1>Welcome to the Clinic!</h1>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
