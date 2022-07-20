// Icons found at https://react-icons.github.io/react-icons/icons?name=bs

import { Link } from "react-router-dom"
import { Card, Button } from "react-bootstrap"
import {BsFillTrashFill} from "react-icons/bs"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useSelector } from "react-redux"

import EditPost from "./EditPost";

/* props contents: author, post_contents, likes, date_created, stateChange, setChange() */
const Post = (props) => {
    let {info} = props
    const currentUser = useSelector(state => state.userInfo.user)

    // Delete post function
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

    // Add delete and edit buttons to logged in user posts. Edit button is located in the EditPost.js file
    // Tooltips are from https://react-bootstrap.github.io/components/overlays/#tooltips
    let Footer = () => {
        if(currentUser._id === info.author._id) {
            return <Card.Footer>    
                    <EditPost info={info} setChange={props.setChange} stateChange={props.stateChange}/>
                    <span> | </span>
                    <OverlayTrigger placement="bottom" delay={{show: 400, hide: 200}} overlay={<Tooltip id="deleteTool">delete</Tooltip>}>
                        <Button variant="danger" onClick={HandleDelete}><BsFillTrashFill className="" /></Button>
                    </OverlayTrigger> 
                </Card.Footer>
        }
        else{return <></>}
        
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