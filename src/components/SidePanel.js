// Side panel of the frontpage. Will hold links to all the users or friends.
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ListGroup } from "react-bootstrap"

const SidePanel = () => {

    const [allUsers, setAllUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [display, setDisplay] = useState(allUsers)
    const [errors, setErrors] = useState()

    useEffect(() => { 
        // Fetch all the users
        fetch(`${process.env.REACT_APP_BASE_URL}/all_users`, {mode: 'cors'})
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

    const handleChange = ()=> {
        let searchParam = document.querySelector("#searchBar").value
        if(!searchParam) {
            setDisplay(allUsers)
            return
        }
        console.log("ALL USERS", allUsers)
        let filtered = allUsers.filter(user => user.username.includes(searchParam))
        console.log(filtered)
    }

    return(
        <div className="side-panel">
            <h2>Users</h2>
            <input id="searchBar" onChange={handleChange}></input>
            <ListGroup variant="flush">
            {!loading ? (
                display.map(function(user, i) {
                    let id = user._id
                    return <ListGroup.Item key={i}><Link to={`/user/${id}`}>{user.username}</Link></ListGroup.Item>
                })
            ) : (<div></div>)}
            </ListGroup>
        </div>
    )
}

export default SidePanel