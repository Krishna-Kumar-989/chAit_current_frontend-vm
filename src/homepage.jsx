import {React,useContext,createContext} from 'react';
import Sidebar from './components/sidebar';
import ChatArea from './components/chatArea';
import NavBar from './components/Navbar';
import './App.css';

import AddContact from './components/addcontact';








const Homepage = () => {

  return (
    <div className="page">
      
      <div className="navb">
    <NavBar/>
          </div>
           <div className="app">
        <ChatArea className="chatArea" />
      </div>




    </div>
  );
};

export default Homepage;
