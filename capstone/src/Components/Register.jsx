import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser, setUserRole } from '../firebase';
import { Link } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password || !role){
            alert('Please fill all fields');
            return;
        }
        try{
            const userCredential = await registerUser(email, password);
            const user = userCredential.user;
            await setUserRole(user.uid, role);
            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch(error){
            alert('Error:' + error.message);
        }
    };


  return (
    <>
    <form onSubmit={handleSubmit}>
        <input type='email' placeholder='janedoe@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>

        <select value={role} onChange={(e) => setRole(e.target.value)}> 
            <option value="">Select Role</option>
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
            <option value="rider">Rider</option>
        </select>
        <button type='submit'>Register</button>

        <p>Already have an account? <Link to="/login">Login here</Link></p>

    </form>
    </>
  )
}

export default Register