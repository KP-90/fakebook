// This is the page for the CURRENT LOGGED IN user
import FriendList from "./FriendsList"
import FriendsPending from "./FriendsPending"
import Post from "../postFiles/Post"
import Timeline from "../postFiles/Timeline"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeUser } from "../userSlice"
import useToken from "../../hooks/useToken"
import '../../styles/userPage.css'

const Userinfo = () => {

    const {token, setToken} = useToken()
    const dispatch = useDispatch()

    let currentUser = useSelector(state => state.userInfo.user)
    const [userPosts, setPosts] = useState()
    const [stateChange, setChange] = useState(false)

    useEffect(() => {
        fetch('http://localhost:4000/me', {mode: 'cors', headers: {'authorization': `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            setPosts(data.posts)
            dispatch(changeUser(data.user))
        })
    }, [stateChange])

    let PostsSection = () => {
        if(userPosts && userPosts.length > 0) {
            return userPosts.map((post, i) => {
                return <Post key={i} info={post} stateChange={stateChange} setChange={setChange} />
            })
        }
        else {
            return <p>This user has no posts yet</p>
        }
    }

    return(
        <div>
            <h2>Hello {currentUser.first}</h2>
            <h3>or should we say...</h3>
            <h1>"<strong>{currentUser.username}</strong>"</h1>

            <p>You have <FriendList friends={currentUser.friends}/>.</p>
            {currentUser.pending_friends.length > 0 ? (
                <p>and <FriendsPending stateChange={stateChange} setChange={setChange}/></p>
            ) : (
                <p>No pending requests.</p>
            )}
            <div className="container posts">
                <h4>Posts by this user</h4>
                <Timeline allPosts={userPosts} />    
            </div>
            
            


        </div>
    )
}

export default Userinfo