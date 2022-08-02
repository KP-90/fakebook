import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Timeline from '../postFiles/Timeline';
import { changeToken, changeUser } from '../userSlice';
import { useNavigate } from 'react-router';
import useToken from '../../hooks/useToken';

const UserTabs = (props) => {

    const {userPosts, currentUser, setToken} = props
    const nav = useNavigate()
    const dispatch = useDispatch()
    
    // Modal stuff //
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // Triggers on button click. Deletes the user upon confirmation
    const handleDelete = () => {
        console.log("USER_DELETEING_PROCESS INITIATE")
        fetch(`http://localhost:4000/user/delete/${currentUser._id}`, {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            localStorage.removeItem('token')
            dispatch(changeToken({'token': null}))
            dispatch(changeUser(""))
            setToken({'token': null})
            nav('/')
        })
    }

    return(
        <div>
            <Tabs
                defaultActiveKey="posts"
                id="fill-tabs"
                className="mb-3"
                fill
            >
                <Tab eventKey="posts" title="Posts">
                    <div className="container posts">
                        <h4>Posts by this user</h4>
                        <Timeline allPosts={userPosts} />    
                    </div>
                </Tab>
                <Tab eventKey="liked" title="Liked">
                    <p>This is where the liked posts will go</p>
                </Tab>

                
                <Tab eventKey="danger" title="Danger">
                    <div className='danger-section'>
                        <h4>Warning: Clicking the button below will permanently delete you. None of that Facebook crap where it saves your profile forever in the hidden depths only to 
                            resurface as soon as you log in again. THIS IS PERMANENT!!!
                        </h4>
                        <h5>You have been warned</h5>
                        <Button variant='danger' onClick={handleShow}>Delete User</Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete User?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h2>Last chance. Are you sure you want to delete your entire profile?</h2>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button variant='danger' onClick={handleDelete} >
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>

                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default UserTabs