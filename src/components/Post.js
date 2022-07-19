// Icons found at https://react-icons.github.io/react-icons/icons?name=bs

import { Link } from "react-router-dom"
import { Card } from "react-bootstrap"
import {BsFillTrashFill, BsPencilSquare} from "react-icons/bs"
import { useSelector } from "react-redux"

/* props contents: author, post_contents, likes, date_created, stateChange setChange() */
const Post = (props) => {
    let {info} = props
    const currentUser = useSelector(state => state.userInfo.user)

    const HandleDelete = () => {
        if(window.confirm("Are you sure you want to delete this post?\n")) {
            fetch(`http://localhost:4000/delete/${info._id}`, {
                method: 'post',
                mode: 'cors'})
            .then(response => {
                if(!response.ok) {
                    console.log(response)
                }
                props.setChange(!props.stateChange)
            })
        }
    }

    // Add tooltips. from https://react-bootstrap.github.io/components/overlays/#tooltips
    let Footer = () => {
        if(currentUser._id === info.author._id) {
            return <Card.Footer><BsFillTrashFill className="icon" onClick={HandleDelete}/> | <BsPencilSquare className="icon" /></Card.Footer>
        }
        return <></>
    }
        

    return(
        <Card>
            <Card.Title>
                <Link to={`/user/${info.author._id}`}>{info.author.username}</Link>
            </Card.Title>
            <Card.Subtitle>Posted: {info.date_created}</Card.Subtitle>
            <Card.Text>{info.post_contents}</Card.Text>
            <Footer />

        </Card>
    )
}

export default Post