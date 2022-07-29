// This is the page for the CURRENT LOGGED IN user
import FriendList from "./FriendsList"
import FriendsPending from "./FriendsPending"
import { useState } from "react"
import { useSelector } from "react-redux"

const Userinfo = () => {

    const currentUser = useSelector(state => state.userInfo.user)

    return(
        <div>
            <h2>Hello {currentUser.first}</h2>
            <h3>or should we say...</h3>
            <h1>"<strong>{currentUser.username}</strong>"</h1>

            <p>You have <FriendList friends={currentUser.friends}/>.</p>
            {currentUser.pending_friends.length > 0 ? (
                <p>and <FriendsPending /></p>
            ) : (
                <p>No pending requests.</p>
            )}
            


        </div>
    )
}

export default Userinfo