import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {changeToken, changeUser} from '../userSlice'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../styles/login.css'
import Signup from './Signup';

const  Login = ({setToken}) => {

    const dispatch = useDispatch()
    const [errors, setErrors] = useState()

    // takes username and password then sends to api for verification. Saves a token on success
    const handleSubmit = (e) => {
        e.preventDefault()
        let uname = document.querySelector('#uname').value
        let pword = document.querySelector('#pword').value
        fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
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
            console.log(data)
            if(data.token) {
                console.log(data)
                dispatch(changeToken(data))
                setToken(data)
            }
            else {
                setErrors(data)
            }
        })
    }

    // Guest log on. import './App.css';
    const handleGuest = (e) => {
        console.log("Logging in guest...")
        console.log("Calling upon : https://stark-falls-82245.herokuapp.com")
        e.preventDefault()
        fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
            method: "POST",
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: "guest",
                password: "Guest"
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

    const handleTest = (e) => {
        console.log("Logging in guest...")
        e.preventDefault()
        fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
            method: "POST",
            mode: 'cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',},
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

    const handleCreate = (e) => {
        let first = 'test1'
        let last = ''
        let username = 'test1'
        let password = 'test'  
        let confirm_pass = 'test'

        fetch(`${process.env.REACT_APP_BASE_URL}/user`, {
            method: 'POST', 
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                first: first,
                last: last,
                username: username,
                password: password,
                confirm_pass: confirm_pass
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log("DATA: ", data)
                if(!data.ok) {
                    console.log("ERRORS IN SIGNUP")
                }
                else{
                    window.alert("User succesfully created. \nPlease attempt to log in now.\n")
                }
            })
    }
    
    const Errors = () => {
        if(errors && errors.length > 1) {
            console.log("Error function: ", errors)
            return(
            <div>
                {errors.map((err) => {
                    return <li>{err.msg}</li>
                })}
            </div>)
        }
        else if(errors) {
            return(
                <div>
                    <li>{errors.msg}</li>
                </div>
            )
        }
        else{return}
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
                <Errors />
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
                <Button variant='info' onClick={handleTest}>Test log in</Button>
                <Button variant='secondary' onClick={handleCreate}>Create user</Button>
            </div>
        </div>
        
    )
}

export default Login