// Icons found at https://react-icons.github.io/react-icons/icons?name=bs

import { Link } from "react-router-dom"
import { Card, Button } from "react-bootstrap"
import {BsFillTrashFill } from "react-icons/bs"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { useSelector } from "react-redux"

import EditPost from "./EditPost";
import Comments from "./Comments";
import LikeBtn from "./LikeBtn";

/* props contents: author, post_contents, likes, date_created, stateChange, setChange() */
const Post = (props) => {
    let {info} = props

    const currentUser = useSelector(state => state.userInfo.user)

    // Delete post function
    const HandleDelete = () => {
        if(window.confirm("Are you sure you want to delete this post?\n")) {
            fetch(`${process.env.REACT_APP_BASE_URL}/delete/${info._id}`, {
                method: 'post',
                mode: 'cors'})
            .then(response => {
                if(!response.ok) {
                    console.log("Error: ", response)
                }
                props.setChange(!props.stateChange)
            })
        }
    }


    // Add delete and edit buttons to logged in user posts. Edit button is located in the EditPost.js file
    // Tooltips are from https://react-bootstrap.github.io/components/overlays/#tooltips
    let Footer = () => {
        if(currentUser._id === info.author._id || currentUser.isAdmin) {
            return <div className="postOptions">    
                    <EditPost info={info} setChange={props.setChange} stateChange={props.stateChange}/>
                    <span> | </span>
                    <OverlayTrigger placement="bottom" delay={{show: 400, hide: 200}} overlay={<Tooltip id="deleteTool">delete</Tooltip>}>
                        <Button variant="danger" onClick={HandleDelete}><BsFillTrashFill className="" /></Button>
                    </OverlayTrigger>
                </div>
        }
        else{return <></>}
        
    }
        

    return(
        <Card>
            <Card.Title className="card-contents">
                <Link to={`/user/${info.author._id}`}>{info.author.display_name}</Link>
            </Card.Title>
            <Card.Subtitle className="card-contents">Posted: {info.date_readable}</Card.Subtitle>
            <Card.Text className="card-contents">{info.post_contents}</Card.Text>
            <div className="postInfo">
                <Comments id={info._id}/> 
                <LikeBtn currentUser={currentUser} info={info}/>
            </div>
            <Card.Footer>
                <div style={{display:'flex', alignItems:'baseline'}}>
                    <Footer />
                </div>
            </Card.Footer>

        </Card>
    )
}

export default Post