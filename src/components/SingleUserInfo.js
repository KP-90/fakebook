// Page for an individual user that IS NOT the current logged in user.

import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const SingleUser = () => {

    const nav = useNavigate()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()
    const { id } = useParams()
    const currentUser = useSelector(state => state.userInfo.user)
    
    useEffect(() => {

        // If the selected user is the same as the logged in user, redirect them to their own user page.
        if(id === currentUser._id) {
            console.log("SAME USER")
            nav('/user/me')
        }
        // Get info for the individual user
        fetch(`http://localhost:4000/user/${id}`, {mode:'cors',})
        .then(response => response.json())
        .then(data => {
            console.log("DATA: ", data.user)
            setUser(data.user)
            setLoading(false)
        })
    }, [])

    if(!loading) {
    return(
        <div>
            <h2>Welcom to the profile of {user.first} {user.last}</h2>
            <p>Joined: {user.date_created}</p>
            <h3>or should we say...</h3>
            <h1>"<strong>{user.username}</strong>"</h1>

            <p>They have {user.friends.length} friends.</p>
        </div>
    )
    }
}

export default SingleUser