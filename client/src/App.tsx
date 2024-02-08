import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AuthProvider } from './config/AuthContext'; 
// initializeApp(config.firebaseConfig);
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
