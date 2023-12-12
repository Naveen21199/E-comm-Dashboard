import axios from 'axios';
import React, { useState } from 'react';
const AddProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError] = useState(false)

    const addProduct = async () => {
        console.warn(!name)
        if (!name || !price || !category || !company) {
            setError(true)
            return false
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id
        let result = await axios.post('http://localhost:5000/api/v1/product/add-product', {
            name, price, category, company, userId
        }, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        })
        result = await result.data
        console.log(result)
    }
    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input type="text" value={name} placeholder='enter product name' className='inputBox' onChange={(e) => setName(e.target.value)} />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input type="text" value={price} placeholder='enter product price' className='inputBox' onChange={(e) => setPrice(e.target.value)} />
            {error && !price && <span className='invalid-input'>Enter valid name</span>}


            <input type="text" value={category} placeholder='enter product category' className='inputBox' onChange={(e) => setCategory(e.target.value)} />
            {error && !category && <span className='invalid-input'>Enter valid name</span>}


            <input type="text" value={company} placeholder='enter product company' className='inputBox' onChange={(e) => setCompany(e.target.value)} />
            {error && !company && <span className='invalid-input'>Enter valid name</span>}


            <button className='appButton' onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct