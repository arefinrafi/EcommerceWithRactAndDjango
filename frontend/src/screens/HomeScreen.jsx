import React, { useEffect } from 'react'
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
// import products from '../products'
// import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useLocation } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';


const HomeScreen = () => {

  // const [products, setProducts] = useState([])
  const location = useLocation()
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { error, loading, products, pages, page } = productList

  let keyword = location.search
  // console.log(keyword)

  useEffect(() => {
    // async function fetchProducts() {

    //   const { data } = await axios.get('/api/products/')
    //   setProducts(data)

    // }

    // fetchProducts()

    // ============== using Redux Start ==============//
      dispatch(listProducts(keyword))
    // ============== using Redux End ==============//
   
  }, [dispatch, keyword])

  return (
    <div>
        {!keyword && <ProductCarousel />}
        
        <h1>Latest Products</h1>

        { loading 
          ? <Loader />
          : error 
          ? <Message variant='danger'>{ error }</Message> 
          : 
            <div>
              <Row>
                  {products.map(product => (
                      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                          <Product product={product} />
                      </Col>
                  ))}
              </Row>

              <Paginate page={page} pages={pages} keyword={keyword} /> 
            </div>
          
        }

        
    </div>
  )
}

export default HomeScreen