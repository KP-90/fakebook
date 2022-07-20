// Side panel of the frontpage. Will hold links to all the users or friends.
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ListGroup } from "react-bootstrap"

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
            <h2>Trending Users</h2>
            <ListGroup variant="flush">
            {!loading ? (
                allUsers.map(function(user, i) {
                    let id = user._id
                    return <ListGroup.Item key={i}><Link to={`/user/${id}`}>{user.username}</Link></ListGroup.Item>
                })
            ) : (<div></div>)}
            </ListGroup>
        </div>
    )
}

export default SidePanel