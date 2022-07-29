import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const FriendList = ({friends}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let ActualList = () => {
        if(friends.length > 0) {
            return friends.map((friend, i) => {
                return <div key={i} className="friendList">
                    <h5>{friend.first} {friend.last}</h5>
                    <Link to={`/user/${friend._id}`}><span>({friend.username})</span></Link>
                </div>
            })
        } else {
            return <p>Theres nothing here.</p>
        }   
    }

    return(
        <>
            <span className="fauxLink" onClick={handleShow}>{friends.length} friends</span>
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