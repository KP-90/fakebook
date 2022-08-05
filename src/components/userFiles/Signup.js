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
        const form = e.currentTarget
        if(form.checkValidity() === false) {
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

        fetch(`${process.env.REACT_APP_BASE_URL}/user`, {
            method: 'POST', 
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                first: first,
                last: last,
                username: username.toLowerCase(),
                password: password,
                confirm_pass: confirm_pass
            })
        })
            .then(response => response.json())
            .then(data => {
                if(!data.ok) {
                    console.log("ERRORS IN SIGNUP")
                    setErrors(data)
                }
                else{
                    setShow(false)
                    window.alert("User succesfully created. \nPlease attempt to log in now.\n")
                }
            })
        }
    }

    const Errors = () => {
        if(errors) {
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
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="first">
                            <Form.Label>First name*</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                            />
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