// This will be the modal to show messages to and from userA and userB
import { Button, Card, Modal } from "react-bootstrap"
import { useState } from "react";

const Message = (props) => {
    const {friend} = props

    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false)};
    const handleShow = (e) => {
        removeAlert(e)
        setShow(true)
    };

    const removeAlert = (e) => {
        let test = e.target.querySelector(".new-message-alert")
        test.innerText = " "
        console.log(test)
    }
    return(
        <>
        <Card className="person" onClick={handleShow}>
            <Card.Body>
                <div className="person-details">
                    <h5>{friend.display_name}</h5>
                    <h5 className="new-message-alert">NEW</h5>
                </div>
            </Card.Body>
        </Card>
        


        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{friend.display_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default Message