// This is the page for the CURRENT LOGGED IN user

import { useSelector } from "react-redux"

const Userinfo = (props) => {

    const currentUser = useSelector(state => state.userInfo.user)

    return(
        <div>
            <h2>Hello {currentUser.first}</h2>
            <h3>or should we say...</h3>
            <h1>"<strong>{currentUser.username}</strong>"</h1>
        </div>
    )
}

export default Userinfo