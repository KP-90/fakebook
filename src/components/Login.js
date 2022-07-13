import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {changeToken, changeUser} from './userSlice'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/login.css'
import Signup from './Signup';

const  Login = ({setToken}) => {

    const dispatch = useDispatch()

    // takes username and password then sends to api for verification. Saves a token on success
    const handleSubmit = (e) => {
        e.preventDefault()
        let uname = document.querySelector('#uname').value
        let pword = document.querySelector('#pword').value
        fetch("http://localhost:4000/login", {
            method: "POST",
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: uname,
                password: pword
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.token) {
                dispatch(changeToken(data))
                setToken(data)
            }
        })
    }

    // Guest log on. import './App.css';
    const handleGuest = (e) => {
        console.log("Logging in guest...")
        e.preventDefault()
        fetch("http://localhost:4000/login", {
            method: "POST",
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: "test",
                password: "testing"
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.token) {
                dispatch(changeToken(data))
                setToken(data)
            }
        })
    }

    return(
        <div className='container center'>
            <h2>Please Log in</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="uname">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="pword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' required/>
                </Form.Group>
                <div>
                    <Button type="submit">Submit</Button>
                    <p>or</p>
                    <Signup />
                </div>
                

            </Form>
            <hr></hr>
            <div className='container'>
                <h3>Guest Log in</h3>
                <p>Click below to log in to the Guest account to see how the site looks. You will have limited access to things but you can still
                    sign up for your own account whenever you want.
                </p>
                <Button varient='primary' onClick={handleGuest}>Guest Log In</Button>
            </div>
        </div>
        
    )
}

export default Login