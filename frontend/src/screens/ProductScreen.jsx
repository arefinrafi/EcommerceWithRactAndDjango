import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Row, Col, Image, Button, Card, ListGroup, Form } from 'react-bootstrap';
// import products from '../products'
import Rating from '../components/Rating';

// import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader';
import Message from '../components/Message';




const ProductScreen = ({ match, history }) => {
    const { id } = useParams();
    let navigate = useNavigate();

    const [qty, setQty] = useState(1)

    // const product = products.find((p) => p._id === id )

    // const [product, setProduct] = useState([])

    // ========= Use Redux Start ========= //
        const dispatch = useDispatch()
        const productDetails = useSelector(state => state.productDetails)
        const { loading, error, product } = productDetails
    
    // ========= Use Redux End ========== //

    useEffect(() => {
        // async function fetchProduct() {

        // const { data } = await axios.get(`/api/products/${id}`)
        // setProduct(data)

        // }

        // fetchProduct()

        // ========= Use Redux Start ========= //
            dispatch(listProductDetails(id))
    
        // ========= Use Redux End ========== //
    
    }, [dispatch, id])


    const addToCartHandler = () => {
        // console.log('Add TO Cart: ', id)
        navigate(`/cart/${id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to='/' className='btn btn-light ny-3'>Go Back</Link>
            
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                    :   <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
            
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
            
                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                    </ListGroup.Item>
            
                                    <ListGroup.Item>
                                        Price: ${product.price}
                                    </ListGroup.Item>
            
                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
            
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price: </Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
            
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status: </Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {
                                            product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                {
                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={x+1} value={x+1}>
                                                                            { x+1 }
                                                                        </option>
                                                                    ))
                                                                }
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )
                                        }
            
                                        <ListGroup.Item>
                                            <Row className='px-2'>
                                                <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0}>Add To Cart</Button>
                                            </Row>
                                            
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>     
                            </Col>
                        </Row>
            }
            
            
        </div>
    )
}

export default ProductScreen