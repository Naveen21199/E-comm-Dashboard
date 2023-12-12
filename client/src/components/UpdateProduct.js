import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
const UpdateProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(params)
        getProductDetails()
    }, [])
    const getProductDetails = async () => {
        let response = await axios.get(`http://localhost:5000/api/v1/product/getProduct/${params.id}`, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        let result = await response.data
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)

    }

    const updateProduct = async () => {
        console.log(name, price, category, company)
        let response = await axios.put(`http://localhost:5000/api/v1/product/update/${params.id}`, {
            name, price, category, company,
        }, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        }
        )
        let result = await response.data
        console.log(result)
        navigate('/')
    }
    return (
        <div className='product'>
            <h1>Updatae Product</h1>
            <input type="text" value={name} placeholder='enter product name' className='inputBox' onChange={(e) => setName(e.target.value)} />

            <input type="text" value={price} placeholder='enter product price' className='inputBox' onChange={(e) => setPrice(e.target.value)} />


            <input type="text" value={category} placeholder='enter product category' className='inputBox' onChange={(e) => setCategory(e.target.value)} />


            <input type="text" value={company} placeholder='enter product company' className='inputBox' onChange={(e) => setCompany(e.target.value)} />

            <button className='appButton' onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct