import React from 'react';import { FiAlignLeft, FiInfo ,FiSettings,FiCommand} from "react-icons/fi";
import { useNavigate } from 'react-router-dom';






import './NavBar.css';  // Optional: Styling for the navbar

const NavBar = () => {




  const navigate =  useNavigate();





  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <FiCommand/>
        </li >
        <li onClick={()=>{navigate('/homepage')}}>
        ChAIt
        </li>
        <li>
          <FiSettings/>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
