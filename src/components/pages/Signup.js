import React, { useState } from 'react'
import { Col, Container, Form, Row, Button, Alert } from 'react-bootstrap'
import {Link}  from 'react-router-dom'
import './Signup.css'
import {useSignupMutation} from "../../services/appApi.js"

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signup, {error, isLoading, isError}] = useSignupMutation()

    function handleSignup(e){
        e.preventDefault();
        signup({name, email, password})
    }
  return (

    <Container>
        <Row>
            <Col md={6} className="signup_form--container">
                <Form style={{width: "100%"}} onSubmit={handleSignup}>
                    <h2>Create an accounts</h2>
                    {isError && <Alert variant='danger'>{error.data}</Alert>}
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={name} required
                            onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>
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
                        <Button type="submit" disabled={isLoading}>Create Account</Button>
                    </Form.Group>
                    <p>Have an account<Link to="/login">Login</Link></p>
                </Form>    
            </Col>    
            <Col md={6} className="signup_image--container"></Col>    
        </Row>    
    </Container>
  )
}

export default Signup