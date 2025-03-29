import React from 'react';
import './Sidebar.css';
import { useState , useEffect,useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {io} from "socket.io-client"
import { useNavigate } from 'react-router-dom';

import { FiUserPlus } from "react-icons/fi";
import { SelectedcontactContext } from '../context/SelectedcontactContext';






const  Sidebar =  () => {
  
//cuurentloginuser
const { loginuser } = useContext(SelectedcontactContext);

const currentLoginUserId = loginuser; //localStorage.getItem('login_user') ;

  const [searchQuery, setSearchQuery] = useState('');

  let [contacts,setcontact ] = useState([]) ;





  const navigate =  useNavigate();


  const { setSelectedContact ,selectedcontextContact} = useContext(SelectedcontactContext);




  // Handle the contact selection and update selectedContact immediately
  const handleContactSelect = async (contactId) => {
    
    
    console.log('Selected contact ID immediately:', contactId);

    // Pass the selected contact ID to the parent component
    
    setSelectedContact(contactId);

    

    //set selcted contact in localstorage for selcted contact info



  };

  




  useEffect(()=>{
if(selectedcontextContact){
    
    console.log("THE SELCTED CONTACT IS :"+ selectedcontextContact.reference)


     

    //load old chats

    axios.post('http://localhost:3000/application/chat', {
      me:  loginuser,
      you: selectedcontextContact.reference,
      token: " "+ Cookies.get('authToken') ,
    })
    .then(function (response) {
      console.log("old chats arehere :-"+ response.data);
      localStorage.setItem('old_chats',JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error);
      localStorage.setItem('old_chats',)
     
    });

  }


},[selectedcontextContact])





  // Store the socket connection globally within the component
  const socket = React.useRef(null); // Using useRef to persist the socket instance
 
 
  const mytoken = 'Bearer' + ' ' + Cookies.get('authToken');




  useEffect(() => {
   
      
      
     
  //socket things


   // Initialize the socket connection only once
   socket.current = io("http://localhost:10000",{
  
    query:{token :Cookies.get('authToken')}
   });



  socket.current.on("connect",()=>{
    console.log("socket connnected")
  })


 // Register the user ID after connection
 socket.current.emit('register', currentLoginUserId);
     




                   ///search

  socket.current.emit('client_data',"",currentLoginUserId);










  socket.current.on('contact_data', (data) => {
    console.log('Received JSON data:', data);
    setcontact(data);

  })

///////////////////////////////////////////



       




        
    
    


  
//displaycontacts

console.log(contacts)
contacts.forEach(contact => {
  console.log(`Contact: ${contact.name}`);
});

  }, []);
  




  const searchrequest = async (e) => {
  
    setSearchQuery(e.target.value);
  
   
   

 console.log(searchQuery)
  

};

  


//when something typed on search bar
  
      useEffect(() => {
  //socket things

  socket.current.emit('client_data', searchQuery,currentLoginUserId);
  
  socket.current.on('contact_data', (data) => {
    console.log('Received JSON data:', data);
    setcontact(data);



    socket.current.on("connect", () => {
      console.log("Socket connected:", socket.current.id);
    });


  })


},[searchQuery]);















     





































  return (
    <div className="msidebar">

      <div className="mtopsidebar"> 
           <div className='contactslabel'><h2>Contacts</h2></div>
      
        
        
        
        </div>
  
        

      <div className='msearchdiv'>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange=  {searchrequest}
        style={styles.searchInput}
        className='msearch'
      />
      
    

        </div>


      <div className="mlistcontainer">
      <ul className='mcontactList'>
        
        
        {contacts.map(contact => (
          <li key={contact._id} id ={contact._id}  onClick={()=>{
            
   
            localStorage.removeItem('old_chats')
            handleContactSelect(contact)


          }}    className={contact._id === selectedcontextContact?._id ? 'highlighted' : ''}>
            
            <div className="searchlistlistinfo">
            
            {contact.username}

           <p className='searchlistlistphone'>{contact.phone}</p>  


            </div>
          
          
            
            
            
            </li>
        ))}
      
      </ul>

</div>

<div className="newcontactcontainer">
      
         
      <button className="newcontact" onClick={()=>{
navigate('/addcontact')
       }}><FiUserPlus size={20}/></button>


          
      
      </div>


    </div>
  );
};




const styles = {
  searchInput: {
    padding: '8px',
    fontSize: '16px',
    width: '100%',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  itemList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  item: {
    padding: '8px',
    borderBottom: '1px solid #ccc',
  },




    
  




};







export default Sidebar;
