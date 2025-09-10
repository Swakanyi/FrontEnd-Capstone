import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../firebase';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password){
            alert('Please fill all fields');
            return;
        }
        try{
            await loginUser(email, password);
        } catch(error){
            alert('Error;' + error.message)
        }
    };


  return (
    <>
    <form onSubmit={handleSubmit}>
        <input type='email' placeholder='Janedoe@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Login</button>

        <p>Don’t have an account? <Link to="/register">Register here</Link></p>
    </form>
    </>
  )
}

export default Login