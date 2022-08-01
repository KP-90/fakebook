// Page for an individual user that IS NOT the current logged in user.

import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "react-bootstrap"
import { changeUser } from "../userSlice"
import '../../styles/userPage.css'
const async = require('async')

const SingleUser = () => {

    const nav = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [stateChange, setChange] = useState(false)
    const [targetUser, setUser] = useState()
    const { id } = useParams()
    const currentUser = useSelector(state => state.userInfo.user)
    
    // Gets the info of the selectged user, saves it in targetUser
    useEffect(() => {
        // If the selected user is the same as the logged in user, redirect them to their own user page.
        if(id === currentUser._id) {
            nav('/user/me')
        }
        // Get info for the individual user
        if(!targetUser || targetUser._id !== id) {
            fetch(`http://localhost:4000/user/${id}`, {mode:'cors',})
            .then(response => response.json())
            .then(data => {
                setUser(data.user)
                setLoading(false)
            })
        }
    }, [stateChange])

    // Add Friend button, should add the current user id to the pending friends array of the target user.
    const AddFriend = () => {
        if(currentUser.pending_friends.some(e => e._id === targetUser._id)) {
            console.log("USER ALREADY IN PENDING")
            // Target already in pending friends? Go ahead and simulate accepting the friend request
            let index = currentUser.pending_friends.map(person => person._id).indexOf(targetUser._id)
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
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log("OK :", data)
                    })
                }
            ], function(err, result) {
                if(err) {console.log(err)}
                setChange(!stateChange)
            })
        } 
        else {
            // Else just add to the pending list
            let updated_data = targetUser.pending_friends
            updated_data.push(currentUser._id)
            fetch(`http://localhost:4000/user/update/${targetUser.id}`, {
                method: 'post', 
                mode: 'cors', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...targetUser, payload: {pending_friends: updated_data}}),
            })
            .then(response => response.json())
            .then(data => {
                setChange(!stateChange)
            })
        }
    }
    
    // Checks where the current user is (i.e.  pending_friends, or friends) and removes them from the array.
    const RemoveFriend = () => {
        let updated_data
        let updated_field
        let index
        let currentUserFriends = [...currentUser.friends]   
        if(targetUser.pending_friends.includes(currentUser._id) || currentUser.pending_friends.some(e => e._id === targetUser._id)) {
            updated_field = "pending_friends"
            updated_data = targetUser.pending_friends
            index = updated_data.indexOf(currentUser._id)
            updated_data.splice(index, 1)
        } 
        else if(targetUser.friends.some(e => e._id === currentUser._id) || currentUserFriends.some(e => e._id === targetUser._id)) {
            updated_field = "friends"
            // Remove from targets friends array
            updated_data = targetUser.friends
            index = updated_data.indexOf(currentUser._id)
            updated_data.splice(index, 1)
            // Remove from selfs friends array
            let selfIndex = currentUserFriends.indexOf(e => e._id === targetUser._id)

            if (selfIndex !== null ) {
                currentUserFriends.splice(selfIndex, 1)
                console.log("SPLIVE>>>?," , currentUserFriends)
            }
        }
        async.parallel([
            // Remove from target user
            function(callback) {
                fetch(`http://localhost:4000/user/update/${targetUser.id}`, {method: 'post', mode: 'cors', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...targetUser, payload: {[updated_field]: updated_data}})
                })
                .then(response => response.json())
                .then(data => {
                    console.log("data1: ", data)
                })
            },

            // Remove from current user
            function(callback) {
                fetch(`http://localhost:4000/user/update/${currentUser._id}`, {method: 'post', mode: 'cors', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...currentUser, payload: {[updated_field]: currentUserFriends}})
                    }
                )
                .then(response => response.json())
                .then(data => {
                    console.log("data2: ", data)
                    dispatch(changeUser(data.info))
                })
            }
        ]) 
    }

    // Sees if the current user is a friend or pending friends. Then produces add btn or remove btn
    let ButtonSection = () => {
        if((currentUser.friends.some(e => e._id === id)) || targetUser.pending_friends.includes(currentUser._id)) {
            return <div><Button variant="secondary" onClick={RemoveFriend}>Remove Friend</Button></div>
        }
        else {
            return <div><Button variant="primary" onClick={AddFriend}>Add Friend</Button></div>
        }
    }

    if(!loading) {
    return(
        <div>
            <h2>Welcom to the profile of {targetUser.first} {targetUser.last}</h2>
            <p>Joined: {targetUser.date_created}</p>
            <h3>or should we say...</h3>
            <h1>"<strong>{targetUser.username}</strong>"</h1>

            <p>They have {targetUser.friends.length} friends.</p>
            <p>and {targetUser.pending_friends.length} pending requests</p>
            <ButtonSection />
        </div>
    )
    }
}

export default SingleUser