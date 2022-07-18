import { Modal, Button, Form } from "react-bootstrap"
import { useState } from "react";

// Actual component
const Signup = () => {
    
    // Set the visibility of the Modal
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState()
    const [validate, setValidated] = useState(false)

    //Functions for handling opening and closing the Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (e) => {
        console.log("CLICK")
        const form = e.currentTarget
        if(form.checkValidity() === false) {
            console.log("VALIDATION FAIL")
            e.preventDefault();
            e.stopPropagation();
        }
        else{
        setValidated(true);
        let first = document.querySelector("#first").value
        let last = document.querySelector("#last").value
        let username = document.querySelector("#username").value
        let password = document.querySelector("#password").value   
        let confirm_pass = document.querySelector("#confirm_password").value

        fetch('http://localhost:4000/user', {
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
                if(data.errors) {
                    console.log("ERRORS IN SIGNUP")
                    setErrors(data)
                }
                else{
                    setShow(false)
                }
            })
        }
        //Do submit things - http://localhost:4000/user
    }

    const Errors = () => {
        if(errors) {
            console.log("Error function: ", errors.errors)
            return(
            <div>
                {errors.errors.map((err) => {
                    return <li>{err.msg}</li>
                })}
            </div>)
        }
        else{return}
    }

    return (
        <span>
            <p className="link" onClick={handleShow}>Sign Up here</p>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Signup</Modal.Title>
                </Modal.Header>
                <Form validated={validate} onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="first">
                            <Form.Label>First name*</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                            />
                            <Form.Control.Feedback type="invalid">Give me your name!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Last name"
                                id="last"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Username*</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="username"
                                id="username"
                            />
                            <Form.Control.Feedback type="invalid">Invalid username</Form.Control.Feedback>
                        </Form.Group>       
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                id="password"
                            />
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                id="confirm_password"
                            />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Errors />
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button className="btn" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </span>
    );
}

export default Signup