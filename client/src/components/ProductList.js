import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setproducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])
    const getProducts = async () => {
        let result = await axios.get('http://localhost:5000/api/v1/product/products', {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.data
        setproducts(result)
    }
    const deleteProduct = async (id) => {
        let response = await axios.delete(`http://localhost:5000/api/v1/product/delete/${id}`, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        let result = await response.data
        if (result) {
            getProducts()
        }
    }
    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let response = await axios.get(`http://localhost:5000/api/v1/product/search/${key}`, {
                headers: {
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            let result = await response.data
            if (result) {
                setproducts(result)
            }
        } else {
            getProducts()
        }
    }
    return (
        <div className='product-list'>
            <h3>Product list</h3>
            <input type="text" placeholder='Search Products' className='search-product-box'
                onChange={searchHandle} />
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>${item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={`/update/${item._id}`}>Update</Link>
                        </li>
                    </ul>
                )
                    :
                    <h1>No Result Foond</h1>
            }
        </div>
    )
}

export default ProductList