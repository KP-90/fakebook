// This is the page for the CURRENT LOGGED IN user

import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"

const Userinfo = () => {

    const currentUser = useSelector(state => state.userInfo.user)

    let PendingFriends = () => {
        if (currentUser.pending_friends.length > 0) {
            return currentUser.pending_friends.map((friend, i) => {
                console.log(friend)
                return <div key={i}>
                    <p>{friend.username} wants to be friends</p>
                    <Button varient="success">Accept</Button>
                    <Button varient="danger">Decline</Button>
                </div>
            })
        }
    }

    return(
        <div>
            <h2>Hello {currentUser.first}</h2>
            <h3>or should we say...</h3>
            <h1>"<strong>{currentUser.username}</strong>"</h1>

            <p>You have {currentUser.friends.length} friends.</p>
            <p>and {currentUser.pending_friends.length} pending requests</p>

            <PendingFriends />

        </div>
    )
}

export default Userinfo