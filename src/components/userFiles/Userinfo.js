// This is the page for the CURRENT LOGGED IN user

import FriendList from "./FriendsList"
import FriendsPending from "./FriendsPending"
import Post from "../postFiles/Post"
import UserTabs from "./UserTabs"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeUser } from "../userSlice"
import useToken from "../../hooks/useToken"
import '../../styles/userPage.css'

const Userinfo = (props) => {

    const {token, setToken} = useToken()
    const dispatch = useDispatch()

    let currentUser = useSelector(state => state.userInfo.user)
    const [userPosts, setPosts] = useState()
    const [stateChange, setChange] = useState(false)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/me`, {mode: 'cors', headers: {'authorization': `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            setPosts(data.posts)
            dispatch(changeUser(data.user))
        })
    }, [stateChange])

    return(
        <div>
            <h2>Hello {currentUser.first}</h2>
            <h3>or should we say...</h3>
            <h1>"<strong>{currentUser.display_name}</strong>"</h1>

            <p>You have <FriendList friends={currentUser.friends}/>.</p>
            {currentUser.pending_friends.length > 0 ? (
                <p>and <FriendsPending stateChange={stateChange} setChange={setChange}/></p>
            ) : (
                <p>No pending requests.</p>
            )}
            <UserTabs userPosts={userPosts} currentUser={currentUser} setToken={props.setToken}/>
        </div>
    )
}

export default Userinfo