import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getUserDetails, updateUsers } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { USER_UPDATE_RESET } from '../constants/userConstants';



const UserEditScreen = () => {
    let navigate = useNavigate();
    const params = useParams()
    const userId = params.id

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ isAdmin, setIsAdmin ] = useState(false)
    
    const dispatch = useDispatch()
    
    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate


    useEffect(() => {

        if(successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userList')
        } else {

            if(!user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, user, userId, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
      
        dispatch(updateUsers({ _id: user._id, name, email, isAdmin }))
    }

    
    return (
        <div>

            <Link to='/admin/userList'>Go Back</Link>

            <FormContainer>
                <h1>Edit User</h1>

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
                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type='name' 
                                        placeholder='Enter Name' 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='email' className='mt-3'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type='email' 
                                        placeholder='Enter Email' 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>


                                <Form.Group controlId='isadmin' className='mt-3'>
                                    <Form.Check
                                        type='checkbox' 
                                        label='Is Admin' 
                                        checked={isAdmin} 
                                        onChange={(e) => setIsAdmin(e.target.checked)}
                                    >
                                    </Form.Check>
                                </Form.Group>

                                <Button type='submit' variant='primary' className='mt-3'>Update</Button>
                            </Form>
                        )
                }
                
            </FormContainer>
        </div>

        
    )
}

export default UserEditScreen