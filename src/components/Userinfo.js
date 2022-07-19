// This is the page for the CURRENT LOGGED IN user
import FriendList from "./FriendsList"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"
const async = require('async')



const Userinfo = () => {

    const [stateChange, setChange] =  useState(false)

    const currentUser = useSelector(state => state.userInfo.user)
    useEffect(() => {

    }, [stateChange, currentUser])

    const addFriend = (e) => {
        let index = e.target.id
        let targetFriend = currentUser.pending_friends[index]
        let pending_list = [...currentUser.pending_friends]
        let friends_list_copy = [...currentUser.friends]
        // Add target user to friend list aand vice versa
        let targets_friend_list = [...targetFriend.friends]
        targets_friend_list.push(currentUser._id)
        friends_list_copy.push(targetFriend._id)
        // Remove target user from pending list
        pending_list.splice(targetFriend._id, 1)
        // update both users to have each other in the friends list
        async.parallel([
            function(callback) {
                fetch(`http://localhost:4000/user/update/${currentUser._id}`, {method: 'post', mode: 'cors', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...currentUser, payload: {pending_friends: pending_list, friends: friends_list_copy}})
                })
                .then(response => response.json())
                .then(data => {
                })
            },
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
                return <div key={i}>
                    <p>{friend.username} wants to be friends</p>
                    <Button varient="success" onClick={addFriend} id={i}>Accept</Button>
                    <Button varient="danger" onClick={declineFriend} id={i}>Decline</Button>
                </div>
            })
        }
    }

    return(
        <div>
            <h2>Hello {currentUser.first}</h2>
            <h3>or should we say...</h3>
            <h1>"<strong>{currentUser.username}</strong>"</h1>

            <p>You have <FriendList friends={currentUser.friends}/>.</p>
            <p>and {currentUser.pending_friends.length} pending requests</p>

            <PendingFriends />

        </div>
    )
}

export default Userinfo