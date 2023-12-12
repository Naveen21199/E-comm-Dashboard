import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }
    }, [])
    const handleLogin = async () => {
        console.log(email, password)
        let response = await axios.post('http://localhost:5000/api/v1/user/login', {
            email,
            password
        })
        let result = await response.data
        console.log(result)
        if (result.token) {
            localStorage.setItem('user', JSON.stringify(result.user))
            localStorage.setItem('token', JSON.stringify(result.token))
            navigate('/')
        } else {
            alert('Please enter connect detais')
        }
    }
    return (
        <div className='login'>
            <h1>Login</h1>
            <input className='inputBox' type="text" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} value={email} />
            <input className='inputBox' type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} value={password} />
            <button onClick={handleLogin} type='button' className='appButton'>Login</button>

        </div>
    )
}
export default Login