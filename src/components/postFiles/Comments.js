import { useEffect, useState } from "react";
import {  Button, Form, Modal } from "react-bootstrap"
import { useSelector } from "react-redux";

import Comment from "./Comment";

const Comments = ({id}) => {

    const [show, setShow] = useState(false);
    const [comments, setComments] = useState()
    const currentUser = useSelector(state => state.userInfo.user)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Submits a new comment
    const HandleSubmit = (e) => {
        let commentText = document.querySelector("#postingComment")
        fetch(`http://localhost:4000/comments/${id}`, {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                author: currentUser._id,
                comment: commentText.value,
                parentPost: id
            })
        })
        .then(response => {
            if(response.ok) {
                setComments(comments)
            }
        })
        handleClose()
    }


    // Fetch all the comments for this post, and save them in the comments state
    useEffect(() => {
        fetch(`http://localhost:4000/comments/${id}`, {mode:'cors'})
        .then(response => response.json())
        .then(data => {
            setComments(data.results)
        })
    }, [])

    return(
        <>
        <span className="fauxLink" onClick={handleShow}>{comments ? comments.length : '0'} Comments</span>
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton><Modal.Title>Comments</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control as="textarea" rows={2} id="postingComment" placeholder="Post your comment..."/>
                </Form>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={HandleSubmit}>
                    Post Comment
                </Button>
                <div>
                    {comments ? comments.map((comment, i) => {
                        return <Comment comment={comment} key={i} comments={comments} setComments={setComments}/>
                    }) : <p>no comments yet...</p>}
                </div>
            </Modal.Body>
        </Modal>
        </>
        
    )
}

export default Comments