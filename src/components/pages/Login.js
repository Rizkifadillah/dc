import React, { useState } from 'react'
import { Col, Container, Form, Row, Button, Alert } from 'react-bootstrap'
import {Link}  from 'react-router-dom'
import {useLoginMutation} from '../../services/appApi'
import './Signup.css'
// import { useDispatch } from 'react-redux'

function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login, {isError, isLoading, isSuccess, error}] = useLoginMutation()
    // const dispatch = useDispatch();

    function handleSubmit(e){
        e.preventDefault();
        // dispatch(login())
        login({email, password})
    }
  return (

    <Container>
        <Row>
            <Col md={6} className="login_form--container">
                <Form style={{width: "100%"}} onSubmit={handleSubmit}>
                    <h2>Login to your accounts</h2>
                    {isError &&  <Alert variant="danger">{error.data}</Alert>}
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} required
                            onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-5">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit" disabled={isLoading}>Login</Button>
                    </Form.Group>
                    <p>Don't have an account<Link to="/signup">Create account</Link></p>
                </Form>    
            </Col>    
            <Col md={6} className="login_image--container"></Col>    
        </Row>    
    </Container>
  )
}

export default Login