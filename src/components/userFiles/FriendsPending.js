import { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { changeUser } from "../userSlice"
const async = require('async')

const FriendsPending = () => {

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.userInfo.user)
    const [stateChange, setChange] = useState(false)

    /* Modal Stuff */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    /* end modal stuff */

    const addFriend = (e) => {
        let index = e.target.id
        let targetFriend = currentUser.pending_friends[index]
        let pending_list = [...currentUser.pending_friends]
        let friends_list_copy = [...currentUser.friends]
        // Add target user to friend list and vice versa
        let targets_friend_list = [...targetFriend.friends]
        targets_friend_list.push(currentUser._id)
        friends_list_copy.push(targetFriend._id)
        // Remove target user from pending list
        pending_list.splice(targetFriend._id, 1)
        // update both users to have each other in the friends list
        async.parallel([
            // Update the current users pending and friends list by moving the IDs from one array to the other.
            function(callback) {
                fetch(`http://localhost:4000/user/update/${currentUser._id}`, {method: 'post', mode: 'cors', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...currentUser, payload: {pending_friends: pending_list, friends: friends_list_copy}})
                })
                .then(response => response.json())
                .then(data => {
                    // data returns the updated user. dispatch the change to the store
                    dispatch(changeUser(data.info))
                })
            },
            // Update the Target users friends list
            function(callback) {
                fetch(`http://localhost:4000/user/update/${targetFriend._id}`, {method: 'post', mode: 'cors', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...targetFriend, payload: {friends: targets_friend_list}})
                }
                )
                .then(response => response.json())
                .then(data => {
                })
            }
        ], function(err, result) {
            if(err) {console.log(err)}
            setChange(!stateChange)
        })
    }

    
    const declineFriend = (e) => {
        console.log("DECLINE")
        // Remove friends id from the current user pending list
        let index = e.target.id
        let pending_list = [...currentUser.pending_friends]
        pending_list.splice(index, 1)
        fetch(`http://localhost:4000/user/update/${currentUser._id}`, {method: 'post', mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...currentUser, payload: {pending_friends: pending_list}})
            }
        )
        .then(response => response.json())
        .then(data => {
            setChange(!stateChange)
        })
    }

    let PendingFriends = () => {    
        if (currentUser.pending_friends.length > 0) {
            return currentUser.pending_friends.map((friend, i) => {
                return <div key={'friend' + i} className='pending-list'>
                    <p>{friend.username} wants to be friends</p>
                    <div>
                        <Button variant="success" size='sm' onClick={addFriend} >Accept</Button>
                        <Button variant="danger" size='sm' onClick={declineFriend} >Decline</Button>
                    </div>
                </div>
            })
        }
    }

    return(
        <>
        <span className="fauxLink" onClick={handleShow}>{currentUser.pending_friends.length} pending requests</span>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{currentUser.pending_friends.length} Requests</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PendingFriends />
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

export default FriendsPending