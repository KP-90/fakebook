import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const FriendList = ({friends}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let ActualList = () => {
        if(friends.length > 0) {
            return friends.map((friend, i) => {
                return <div key={i}>
                    <h5>{friend.first} {friend.last}</h5>
                    <span>({friend.username})</span>
                </div>
            })
        } else {
            return <p>Theres nothing here.</p>
        }
        
    }


    return(
        <>
            <span onClick={handleShow}>{friends.length} friends</span>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{friends.length} friends</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ActualList />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        
    )
}

export default FriendList