// Page for an individual user that IS NOT the current logged in user.

import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "react-bootstrap"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { changeUser } from "../userSlice"
import '../../styles/userPage.css'
import FriendList from "./FriendsList"
import Timeline from "../postFiles/Timeline";

const async = require('async')

const SingleUser = (props) => {

    const nav = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [stateChange, setChange] = useState(false)
    const [targetUser, setUser] = useState()
    const [userPosts, setPosts] = useState()
    const [likedPosts, setLikedPosts] = useState()          
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
            fetch(`${process.env.REACT_APP_BASE_URL}/user/${id}`, {mode:'cors',})
            .then(response => response.json())
            .then(data => {
                setPosts(data.posts)
                setUser(data.user)
                setLoading(false)
            })
        }
        fetch(`${process.env.REACT_APP_BASE_URL}/liked/${id}`, {mode: 'cors'})
        .then(response => response.json())
        .then(data => {
            setLikedPosts(data.posts)
        })
    }, [stateChange])

    // Add Friend button, should add the current user id to the pending friends array of the target user.
    const AddFriend = () => {

        // if target user is already in the current user pending_friends array, go ahead and simulate accepting the friend request
        if(currentUser.pending_friends.some(e => e._id === targetUser._id)) {
            // Will need to make sure both users are no longer in each others pending array, and add them both to each others friends array
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
                    fetch(`${process.env.REACT_APP_BASE_URL}/user/update/${currentUser._id}`, {method: 'post', mode: 'cors', 
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
                    fetch(`${process.env.REACT_APP_BASE_URL}/user/update/${targetFriend._id}`, {method: 'post', mode: 'cors', 
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({...targetFriend, payload: {friends: targets_friend_list}})
                    })
                    .then(response => response.json())
                    .then(data => {
                        
                    })
                }
            ], function(err, result) {
                // if theres an error, log it to the console, otherwise notifty app of state change
                if(err) {console.log(err)}
                setChange(!stateChange)
            })
        } 
        else {
            // Not in any pending array? just add to the pending array 
            let updated_data = targetUser.pending_friends
            updated_data.push(currentUser._id)
            fetch(`${process.env.REACT_APP_BASE_URL}/user/update/${targetUser.id}`, {
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
    
    // Checks where the current user is located (i.e.  pending_friends, or friends array) and removes them from the array.
    const RemoveFriend = () => {
        let updated_data
        let updated_field
        let index
        let currentUserFriends = [...currentUser.friends]
        // if either person is in one of the pending arrays. If so, set variables to appropiate values
        if(targetUser.pending_friends.includes(currentUser._id) || currentUser.pending_friends.some(e => e._id === targetUser._id)) {
            updated_field = "pending_friends"
            updated_data = targetUser.pending_friends
            index = updated_data.indexOf(currentUser._id)
            updated_data.splice(index, 1)
        } 
        // or if either user is in the friends array. If so, set variables to appropiate values
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
            }
        }
        async.parallel([
            // Remove from target user
            function(callback) {
                fetch(`${process.env.REACT_APP_BASE_URL}/user/update/${targetUser.id}`, {method: 'post', mode: 'cors', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...targetUser, payload: {[updated_field]: updated_data}})
                })
                .then(response => response.json())
                .then(data => {

                })
            },

            // Remove from current user
            function(callback) {
                fetch(`${process.env.REACT_APP_BASE_URL}/user/update/${currentUser._id}`, {method: 'post', mode: 'cors', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...currentUser, payload: {[updated_field]: currentUserFriends}})
                    }
                )
                .then(response => response.json())
                .then(data => {
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

    let LikedPostsSection = () => {
        if(likedPosts && likedPosts.length > 0) {
            return <Timeline allPosts={likedPosts} />
        } else {
            return <p>No liked posts yet</p>
        }
    }

    if(!loading) {
    return(
        <div>
            <h2>Welcom to the profile of {targetUser.first} {targetUser.last}</h2>
            <p>Joined: {targetUser.date_created}</p>
            <h3>or should we say...</h3>
            <h1>"<strong>{targetUser.username}</strong>"</h1>

            <p>They have <FriendList friends={targetUser.friends} /></p>
            <p>and {targetUser.pending_friends.length} pending requests</p>
            
            <ButtonSection />
            
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
            </Tabs>
        </div>
    )
    }
}

export default SingleUser