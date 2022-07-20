// Page for an individual user that IS NOT the current logged in user.

import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Button } from "react-bootstrap"

const SingleUser = () => {

    const nav = useNavigate()
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
        fetch(`http://localhost:4000/user/${id}`, {mode:'cors',})
        .then(response => response.json())
        .then(data => {
            setUser(data.user)
            setLoading(false)
        })
    }, [stateChange])

    // Add Friend button, should add the current user id to the pending friends array of the target user.
    const AddFriend = () => {
        let updated_data = targetUser.pending_friends
        updated_data.push(currentUser._id)
        fetch(`http://localhost:4000/user/update/${targetUser.id}`, {method: 'post', mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...targetUser, payload: {pending_friends: updated_data}})
            }
        )
        .then(response => response.json())
        .then(data => {
            setChange(!stateChange)
        })
    }
    
    // Checks where the current user is (i.e.  pending_friends, or friends) and removes them from the array.
    const RemoveFriend = () => {
        let updated_data
        let updated_field
        let index
        if(targetUser.pending_friends.includes(currentUser._id)) {
            updated_field = "pending_friends"
            updated_data = targetUser.pending_friends
            index = updated_data.indexOf(currentUser._id)
            updated_data.splice(index, 1)
        } 
        else if(targetUser.friends.includes(currentUser._id)) {
            updated_field = "friends"
            updated_data = targetUser.friends
            index = updated_data.indexOf(currentUser._id)
            updated_data.splice(index, 1)
        }

        fetch(`http://localhost:4000/user/update/${targetUser.id}`, {method: 'post', mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...targetUser, payload: {[updated_field]: updated_data}})
            }
        )
        .then(response => response.json())
        .then(data => {
            setChange(!stateChange)
        })
    }

    // Sees if the current user is a friend or pending friends. Then produces add btn or remove btn
    let ButtonSection = () => {
        if((currentUser.friends.some(e => e._id === id)) || (targetUser.pending_friends.includes(currentUser._id))) {
            return <div><Button variant="secondary" onClick={RemoveFriend}>Remove Friend</Button></div>
        } else {
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