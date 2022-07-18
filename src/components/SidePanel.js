// Side panel of the frontpage. Will hold links to all the users or friends.
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const SidePanel = () => {

    const [allUsers, setAllUsers] = useState()
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState()

    useEffect(() => { 
        // Fetch all the users
        fetch("http://localhost:4000/all_users", {mode: 'cors'})
        .then(response => response.json())
        .then(data => {
            if(data.errors) {
                setErrors(data)
            }
            else {
                setAllUsers(data.user)
            }
            setLoading(false)
        })        
    }, [])

    return(
        <div className="side-panel">
            {!loading ? (
                allUsers.map(function(user, i) {
                    let id = user._id
                    return <li key={i}><Link to={`/user/${id}`}>{user.username}</Link></li>
                })
            ) : (<div></div>)}

        </div>
    )
}

export default SidePanel