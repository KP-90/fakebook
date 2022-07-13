// import modules
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

// import components
import { changeToken } from "./userSlice"

const Dashboard = (props) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.userInfo.user)
    const {setToken} = props

    // Log out function
    const handeClick = () => {
        localStorage.removeItem('token')
        dispatch(changeToken({'token': null}))
        setToken({'token': null})
    }

    return(
        <div>
            <h3>Timeline</h3>
            <h4>Hello, {user.first}</h4>


        </div>
        
    )
}

export default Dashboard