import { useState } from "react";
import {  Button, Form, Modal } from "react-bootstrap"

const Comments = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
        <span className="fauxLink" onClick={handleShow}>## Comments</span>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton><Modal.Title>Comments</Modal.Title></Modal.Header>
            <Modal.Body></Modal.Body>
        </Modal>
        </>
        
    )
}

export default Comments