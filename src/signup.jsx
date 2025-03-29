import { useState } from 'react';
import './css/signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState('');
    const navigate =  useNavigate();









    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('phone', phone);
        formData.append('password', password);
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            const response = await axios.post('http://localhost:3000/api/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            setError(response.data.msg)
        } catch (error) {
            console.error('Signup failed:', error.response?.data || error.message);
              setError(error.response.data.msg);
            
        }
    };

    return (
        <div className="login_container">
            <form onSubmit={handleSignup} className="loginform" encType="multipart/form-data">
                <label>Signup</label>

                <p>Username</p>
                <input
                    type="text"
                    className="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <p>Phone Number</p>
                <input
                    type="text"
                    className="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <p>Password</p>
                <input
                    type="password"
                    className="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <p>Confirm Password</p>
                <input
                    type="password"
                    className="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
    <div className="profileimgdiv">
    <p>Profile Image</p>
    <input
        type="file"
        name="image"  
        className="profileImage"
        accept="image/*"
        onChange={(e) => setProfileImage(e.target.files[0])}
    />
</div>


      <div className="errordiv">
                {error && <p className="error" id ="errorid">{error}</p>}


                </div>



                <button type="submit" className="submit" disabled={password !== confirmPassword}>
                    Signup
                </button>

                <a href="#" className="forgotpassword" onClick={()=>{ navigate('/');}}>Already signed in? Login</a>
            </form>
        </div>
    );
}

export default Signup;
