import {React,useState,useContext,useEffect} from 'react';
import './contactinfo.css';

import { SelectedcontactContext } from '../context/SelectedcontactContext';

import NavBar from './Navbar';















function Contactinfo() {






  const { selectedcontextContact } = useContext(SelectedcontactContext);
  
 let [currentcontact , setcurrentcontact]= useState('')



  


  useEffect(() => {
    // Set selected contact and name from context when it changes
    if (selectedcontextContact) {
     

     setcurrentcontact(selectedcontextContact);
     
    }
  }, [selectedcontextContact]); // Only re-run when selectedcontextContact changes








  return (
    <div className="Contactinfoparent">
  
  <div className="navb">
    <NavBar/>
          </div>


  
 

  <div className="mcontactinfocontainer">
         

         <div className="mcontactinfo">
          <div className="mbasicinfo">

          <div className="mprofilepic">

    <div className="mimageframe">

    <img 
  src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" 
  alt="Description of the image" 
  style={{ width: '100%', height: '100%' }} 
/>

      
    </div>
          </div>

          <div className="mnamenumber">
           
           <div className="mname">
         {currentcontact.username}
           </div>
   <div className="mnumber">
{currentcontact.phone}
   </div>



          


          </div>
         </div>


      </div>
    









</div>












    </div>
  );
}

export default Contactinfo;
