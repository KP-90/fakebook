import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {changeToken, changeUser} from '../../redux/userSlice'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../styles/login.css'
import Signup from './Signup';

const  Login = ({setToken}) => {

    const dispatch = useDispatch()
    const [errors, setErrors] = useState()

    // takes username and password then sends to api for verification. Saves a token on success
    const handleSubmit = (e) => {
        console.log(process.env)
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
            if(data.token) {
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
        console.log(process.env)
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

    // used to quickly create a new user - Currently not in use
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

    let showPass = () => {
        let x = document.querySelector("#password")
        if(x.type === 'password') {
            x.type = 'text'
        } else {
            x.type = 'password'
        }
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
                    <Form.Control id="password" type='password' required/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Check type='checkbox' label="Show Password" onClick={showPass} style={{'textAlign': 'initial'}} />
                </Form.Group>
                <Errors />
                <div className='center'>
                    <Button type="submit">Submit</Button>
                    <p>or</p>
                    <Signup />
                </div>
                
                

            </Form>
            <hr></hr>
            <div className='guest_container'>
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