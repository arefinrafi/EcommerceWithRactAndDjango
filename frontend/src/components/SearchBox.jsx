import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')
    
    let navigate = useNavigate()
    const  location = useLocation()

    const submitHandler = (e) => {
        e.preventDefault()

        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)
            
        } else {
            navigate(location.pathname)
        }
    }
    
    return (
        <Form onSubmit={submitHandler}>
            <Row className="align-items-center">
                <Col xs="auto">
                    <Form.Control
                        type='text'
                        name='q'
                        onChange={(e) => setKeyword(e.target.value)}
                        className='mr-sm-2 ml-sm-5'
                    ></Form.Control>
                </Col>

                <Col xs="auto">
                    <Button 
                        type='submit'
                        variant='outline-success'
                    >
                        Submit
                    </Button>
                </Col>
            </Row>
            

            
        </Form>
    )
}

export default SearchBox