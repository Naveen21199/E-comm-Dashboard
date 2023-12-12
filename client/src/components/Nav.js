import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user')
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate('/signup')
    }
    return (
        <div>
            <img src="https://media.licdn.com/dms/image/D4D03AQFicRYNNTZKRQ/profile-displayphoto-shrink_400_400/0/1700674506229?e=1707350400&v=beta&t=Zh4fXElQekr43h924ul2A5ypk9uW94NrNodPWly4jc4" alt="logo" className='logo' />
            {auth ? <ul className='nav-ul'>
                <li><Link to='/'>Product</Link></li>
                <li><Link to='/add'>Add Product</Link></li>
                <li><Link to='/update'>Update Product</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link onClick={logout} to='/signup'>Logout ({JSON.parse(auth).name})</Link></li>
            </ul>
                :
                <ul className='nav-ul nav-right'>
                    <li><Link to='/signup'>Sign up</Link></li>
                    <li> <Link to='/login'>Log In</Link></li>
                </ul>
            }
        </div>
    )
}
export default Nav