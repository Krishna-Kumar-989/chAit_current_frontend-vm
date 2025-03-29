import { useState,useContext } from 'react';
import './css/login.css';
import axios from 'axios';
import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';

import { SelectedcontactContext } from './context/SelectedcontactContext';

       
// After a successful login setting cookie
const setAuthToken = (token,_id) => {
    
    Cookies.set('authToken', token, { expires: 7, secure: true, sameSite: 'Strict' });
    localStorage.setItem('login_user', _id);


   
  }






function Login() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
   const navigate =  useNavigate();
   const [error, setError] = useState('');
  
   const { setloginuser } = useContext(SelectedcontactContext);



    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                phone: phone,
                password: password
            });
            console.log(response.data); // handle response (e.g., success message)
            //setting cookie


            setTimeout(() => {
                setAuthToken(response.data.accessToken,response.data.user._id);
              }, 100); 
            
            
              setloginuser(response.data.user._id);
   
       navigate('/homepage');


        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            setError(error.response.data.msg);
        }


  
  







    };

    return (
        <>
            <div className="login_container">
                <form onSubmit={handleLogin} className="loginform">
                    <label>Login</label>
                    <p>Phone Number</p>
                    <input
                        type="text"
                        className="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <p>Password</p>
                    <input
                        type="password"
                        className="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />


          
      <div className="errordiv">
                {error && <p className="error" id ="errorid">{error}</p>}


                </div>




                    <button type="submit" className="submit">Login</button>

                    <a href="#" className="forgotpassword" id="passforget">Forgot password?</a>

                      <a href="#" className="forgotpassword"  onClick={()=>{ navigate('/signup');}}>Not registered ? Signup</a>
                </form>
            </div>
        </>
    );
}

export default Login;
