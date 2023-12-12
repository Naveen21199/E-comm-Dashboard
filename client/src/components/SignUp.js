import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const SignUp = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }
    }, [])

    const collectData = async () => {
        console.log(name, email, password)
        let response = await axios.post('http://localhost:5000/api/v1/user/register', {
            name,
            email,
            password
        })
        let result = response.data.user
        // let result = response.data
        console.log(result)
        localStorage.setItem('user', JSON.stringify(result.user))
        localStorage.setItem('token', JSON.stringify(result.token))
        navigate('/')
    }
    return (
        <div className='register'>
            <h1>Register</h1>
            <input className='inputBox' type="text" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />

            <input className='inputBox' type="text" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />

            <input className='inputBox' type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={collectData} type='button' className='appButton'>Sign Up</button>
        </div>
    )
}
export default SignUp;