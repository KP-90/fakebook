import { useState } from "react";
import {  Button, Form, Modal } from "react-bootstrap"
import { BsPencilSquare} from "react-icons/bs"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const EditPost = (props) => {

    const {info} = props
    const [show, setShow] = useState(false);
    const [postContents, setPostContents] = useState(info.post_contents)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const HandleSubmit = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/edit/${info._id}`, {
            method: 'post', 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...info,
                payload: {
                    post_contents: postContents
                }
            })
        })
        .then(response => {
            console.log(response)
            if(response.ok) {
                handleClose()
                props.setChange(!props.stateChange)
            }
        })
    }

    return(
        <>
            <OverlayTrigger placement="bottom" delay={{show: 400, hide: 200}} overlay={<Tooltip id="editTool">edit</Tooltip>}>
                <Button variant="info" onClick={handleShow}><BsPencilSquare className="" /></Button>
            </OverlayTrigger>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton><Modal.Title>Edit Post</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form.Control as='textarea' rows={4} id="editTextarea" value={postContents} onChange={e => setPostContents(e.target.value)}></Form.Control>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={HandleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default EditPost