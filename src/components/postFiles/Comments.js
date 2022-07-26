import { useEffect, useState } from "react";
import {  Button, Card, Form, Modal } from "react-bootstrap"
import { useSelector } from "react-redux";

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
            console.log(response.json())
        })
        handleClose()
    }

    // Edit the comment
    const handleEdit = () => {
        console.log("edit")
    }

    // Delete the comment
    const handleDelete = () => {
        console.log("delete")
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
                        return <Card key={i}>
                                <Card.Title>{comment.author.username} at {comment.date_readable}</Card.Title>
                                <Card.Text>{comment.comment}</Card.Text>
                                {comment.author._id === currentUser._id ? (
                                <Card.Footer className="comment-footer">
                                    <p className="fauxLink" onClick={handleEdit}> edit </p> 
                                    <p> - </p> 
                                    <p className="fauxLink" onClick={handleDelete}> delete </p>
                                </Card.Footer>) : (<></>)}
                            </Card>
                    }) : <p>no comments yet...</p>}
                </div>
            </Modal.Body>
        </Modal>
        </>
        
    )
}

export default Comments