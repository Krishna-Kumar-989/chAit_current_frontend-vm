import { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Signup from './signup';
import Homepage from './homepage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddContact from './components/addcontact';
import Contactinfo from './components/contactinfo';
import { SelectedcontactProvider } from './context/SelectedcontactContext';

function App() {
  // Create a router configuration
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>, // Default route will show Login
    },
    {
      path: "/signup",
      element: <Signup />, // Signup page route
    },
    {
      path: "/homepage",
      element: <Homepage />, // Homepage route
    },
    {
      path:"/addcontact",
      element:<AddContact/>
    },
    {
      path:"/contactinfo",
      element:<Contactinfo/>
    }
  ]);

  return (

   

 <SelectedcontactProvider>

    <div className="screen">
      <RouterProvider router={router} />
    </div>
    </SelectedcontactProvider>
  );
}

export default App;
