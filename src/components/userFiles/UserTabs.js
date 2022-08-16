import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Timeline from '../postFiles/Timeline';
import { changeToken, changeUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router';

const UserTabs = (props) => {

    const {userPosts, currentUser, setToken} = props
    const nav = useNavigate()
    const dispatch = useDispatch()
    const [likedPosts, setLikedPosts] = useState()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/liked/${currentUser._id}`, {mode: 'cors'})
        .then(response => response.json())
        .then(data => {
            setLikedPosts(data.posts)
        })
    }, [])
    
    // Modal stuff //
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // Triggers on button click. Deletes the user upon confirmation
    const handleDelete = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/user/delete/${currentUser._id}`, {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => {
            localStorage.removeItem('token')
            dispatch(changeToken({'token': null}))
            dispatch(changeUser(""))
            setToken({'token': null})
            nav('/')
        })
    }

    let LikedPostsSection = () => {
        if(likedPosts && likedPosts.length > 0) {
            return <Timeline allPosts={likedPosts} />
        } else {
            return <p>No liked posts yet</p>
        }
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
                    <h4>Liked posts by this user</h4>
                    <LikedPostsSection />
                    
                </Tab>

                <Tab eventKey="danger" title="Danger" id="dangerSection">
                    <div className='danger-section'>
                        <h4>Warning: Clicking the button below will permanently delete you. None of that Facebook crap where it saves your profile forever in the hidden depths only to 
                            resurface as soon as you log in again. THIS IS PERMANENT!!!
                        </h4>
                        <h5>You have been warned</h5>
                        {currentUser.username === 'guest' ? (
                            <div>
                            <Button variant='danger' disabled>Delete User</Button>
                            <p>*Button disabled for guest account</p>
                            </div>
                        ) : <Button variant='danger' onClick={handleShow}>Delete User</Button>}
                        
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