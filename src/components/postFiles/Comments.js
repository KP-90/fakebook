import { useEffect, useState } from "react";
import {  Button, Form, Modal } from "react-bootstrap"
import { useSelector } from "react-redux";

import Comment from "./Comment";

const Comments = ({id}) => {
    const currentUser = useSelector(state => state.userInfo.user)

    const [show, setShow] = useState(false);
    const [comments, setComments] = useState()
    const [change, setChange] = useState(false)
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Submits a new comment
    const HandleSubmit = () => {
        let commentText = document.querySelector("#postingComment")
        if (commentText.value.length > 0) {
            fetch(`${process.env.REACT_APP_BASE_URL}/comments/${id}`, {
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
                    commentText.value = ''
                    setChange(!change)
                }
            })
    }
        
    }

    // Fetch all the comments for this post, and save them in the comments state
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/comments/${id}`, {mode:'cors'})
        .then(response => response.json())
        .then(data => {
            setComments(data.results)
        })
    }, [change, id])

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
                
                    {comments && (comments.length > 0) ? comments.map((comment, i) => {
                        return <Comment comment={comment} key={comment._id} comments={comments} setComments={setComments} change={change} setChange={setChange} />
                    }) :  <p>no comments yet...</p>}
                
            </Modal.Body>
        </Modal>
        </>
        
    )
}

export default Comments