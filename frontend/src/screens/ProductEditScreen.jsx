import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { listProductDetails, updateProduct } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';



const ProductEditScreen = () => {
    let navigate = useNavigate();
    const params = useParams()
    const productId = params.id

    const [ name, setName ] = useState('')
    const [ price, setPrice ] = useState(0)
    const [ image, setImage ] = useState('')
    const [ brand, setBrand ] = useState('')
    const [ category, setCategory ] = useState('')
    const [ countInStock, setCountInStock ] = useState(0)
    const [ description, setDescription ] = useState('')
    const [ uploading, setUploading ] = useState(false)

     
    const dispatch = useDispatch()
    
    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate


    useEffect(() => {

        if(successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {
            if(!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }

        
    }, [dispatch, product, productId, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
      
        // Update Product
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))

    }


    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/products/upload/', formData, config)

            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    } 

    
    return (
        <div>

            <Link to='/admin/productList'>Go Back</Link>

            <FormContainer>
                <h1>Edit Product</h1>

                {
                    loadingUpdate && <Loader />
                }

                {
                    errorUpdate && <Message variant='danger'>{errorUpdate}</Message>
                }

                {
                    loading 
                    ? <Loader /> 
                    : error 
                        ? <Message variant='danger'>{error}</Message> 
                        : (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name' className='mt-4 mb-4'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type='name' 
                                        placeholder='Enter Name' 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='price' className='mb-4'>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type='number' 
                                        placeholder='Enter Price' 
                                        value={price} 
                                        onChange={(e) => setPrice(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='image' className='mt-4 mb-4'>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type='text' 
                                        placeholder='Enter Image' 
                                        value={image} 
                                        onChange={(e) => setImage(e.target.value)}
                                    >
                                    </Form.Control>

                                    <Form.Control 
                                        type="file"
                                        label='Choose File'
                                        onChange={uploadFileHandler}
                                    >
                                    </Form.Control>

                                    {
                                        uploading && <Loader />
                                    }
                                </Form.Group>

                                <Form.Group controlId='brand' className='mb-4'>
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        type='text' 
                                        placeholder='Enter Brand' 
                                        value={brand} 
                                        onChange={(e) => setBrand(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='countinstock' className='mt-4 mb-4'>
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control
                                        type='number' 
                                        placeholder='Enter Stock' 
                                        value={countInStock} 
                                        onChange={(e) => setCountInStock(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='category' className='mb-4'>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type='text' 
                                        placeholder='Enter Category' 
                                        value={category} 
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='description' className='mt-4'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type='text' 
                                        placeholder='Enter Description' 
                                        value={description} 
                                        onChange={(e) => setDescription(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Button type='submit' variant='primary' className='mt-3'>Update</Button>
                            </Form>
                        )
                }
                
            </FormContainer>
        </div>

        
    )
}

export default ProductEditScreen