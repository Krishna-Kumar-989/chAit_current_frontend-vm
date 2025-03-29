
import React from 'react';
import './Addcontact.css';
import { useState , useEffect ,useContext} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {io} from "socket.io-client"
import NavBar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft,FiPlusSquare } from "react-icons/fi";
import { SelectedcontactContext } from '../context/SelectedcontactContext';










const AddContact = () => {


  

const { loginuser } = useContext(SelectedcontactContext);



// Current login user
const currentLoginUserId = loginuser;//localStorage.getItem("login_user");

  const navigate =  useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  let [contacts,setcontact ] = useState([]) ;

  
  let [selectedContact , selectContact] = useState('');
  


let handleuserselect =   (contact)=>{


   selectContact(contact);



   

}

useEffect(()=>{

  if (selectedContact) {
  let contact = selectedContact;
   
  const userConfirmed = window.confirm("Do you want to add "+contact.username+" as a contact ?");


   
  if (userConfirmed) {
   alert(contact.username + " added as a contact!")
   


  const addcontactSchemadata ={
  username : contact.username,
  contactTo : currentLoginUserId,
  reference : contact._id,
  phone : contact.phone,
  recentmsg : "",
token: " "+ Cookies.get('authToken') ,
}

console.log(addcontactSchemadata);

axios.post('http://localhost:3000/application/addcontact', addcontactSchemadata)
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});


} else {
      
}



  }




},[selectedContact]);












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


     
  socket.current.emit('add_contact_search', searchQuery);



  socket.current.on('add_contact_search', (data) => {
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

  socket.current.emit('add_contact_search', searchQuery);
  
  socket.current.on('add_contact_search', (data) => {
    console.log('Received JSON data:', data);
    setcontact(data);



    socket.current.on("connect", () => {
      console.log("Socket connected:", socket.current.id);
    });


  })


},[searchQuery]);















     


























  return (
    <div className='superaddcontact'>
     <div className="navb">
    <NavBar/>
          </div>

    <div className="add-contact-container">
     
  <div className="topdivaddcontact">

     <button className="close" onClick={()=>{navigate('/homepage')}}><FiArrowLeft size ={20}/></button>


      <div className='headeraddcontact'>Add Contact</div>
      
      </div>
      
      <div className='searchdiv'>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange=  {searchrequest}
        style={styles.searchInput}
        className='search'
      />
      
    
        </div>

<div className="mainareaaddcontact">
      <div className="listcontainer">
      <ul className='contactList'>
        
        
        {contacts.map(contact => (
          <li class ="listitem" key={contact._id} id ={contact._id}  onClick={()=>{

          


          }}>
            <div className="addcontactlistlistinfo">
            
            {contact.username}

           <p className='addcontactlistlistphone'>{contact.phone}</p>  


            </div>
          <btn className="addtocontactbtn" onClick={()=>{

                  handleuserselect(contact);


          }}>
            <FiPlusSquare/>
          </btn>
          
          
          
          
          </li>
        ))}
      
      </ul>

</div>




{/* 

<div className="contactinfocontainer">
         

         <div className="contactinfo">
          <div className="basicinfo">

          <div className="profilepic">

    <div className="imageframe">

    <img 
  src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" 
  alt="Description of the image" 
  style={{ width: '100%', height: '100%' }} 
/>

      
    </div>

          </div>

          <div className="namenumber">
           
           <div className="name">
         {selectedContact.username}
           </div>
   <div className="number">
{selectedContact.phone}
   </div>



          </div>


          </div>

        <button className="addtocontact" onClick={()=>{

addtocontact(selectedContact)}}>Add to contact</button>

    


         </div>
         </div>


      
     */}


</div>




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
 



    
  




};





export default AddContact;
