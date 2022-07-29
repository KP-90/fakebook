import { Button, Card, Form } from "react-bootstrap"
import { useSelector } from "react-redux"

const Comment = (props) => {
    const {comment, comments, change, setChange} = props
    const currentUser = useSelector(state => state.userInfo.user)

    // Handles showing and hiding the edit textbox for a comment
    const handleEdit = () => {
        let parentElement = document.getElementById(`${comment._id}`)
        let editForm = parentElement.querySelector(".EditForm")
        let commentText = parentElement.querySelector("#cardText")
        if(commentText.style.display !== 'none') {
            editForm.style.display = 'block'
            commentText.style.display = 'none'
       } else {
            editForm.style.display = 'none'
            commentText.style.display = 'block'
       }
    }

    // Save any edits made
    const handleSaveEdit = () => {
        let parentElement = document.getElementById(`${comment._id}`)
        let editForm = parentElement.querySelector(".EditForm")
        let commentText = parentElement.querySelector("#cardText")
        let textBoxEditor = parentElement.querySelector(".editBox")
        console.log(textBoxEditor.value)
        fetch(`http://localhost:4000/comments/edit/${comment._id}`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...comment,
                payload: {
                    comment: textBoxEditor.value
                }
            })
        })
        .then(response => {
            editForm.style.display = 'none'
            commentText.style.display = 'block'
            commentText.innerText = textBoxEditor.value
        })
    }

    // Delete the comment
    const handleDelete = (e) => {
        if(window.confirm("Are you sure?")) {
            // delete
            fetch(`http://localhost:4000/comments/delete/${comment._id}`, {method:'post', mode: 'cors'})
            .then(response => {
                if(response.ok) {
                    // force re-render
                    setChange(!change)
                }
            })
        }
    }

    return(
        <Card id={comment._id}>
            <Card.Title>{comment.author.username} at {comment.date_readable}</Card.Title>
            <Form className="EditForm">
                <Form.Control as='textarea' className="editBox" rows={2} defaultValue={comment.comment}></Form.Control>
                <Form.Group>
                    <Button variant='primary' size='sm' onClick={handleSaveEdit}>Save</Button>
                    <Button variant='danger' size='sm' onClick={handleEdit}>Cancel</Button>
                </Form.Group>
            </Form>
            
            <Card.Text id="cardText">{comment.comment}</Card.Text>
            {comment.author._id === currentUser._id ? (
                <Card.Footer className="comment-footer">
                    <p className="fauxLink" onClick={handleEdit}> edit </p> 
                    <p> - </p> 
                    <p id="commentDelete" className="fauxLink" onClick={handleDelete}> delete </p>
                </Card.Footer>) : (<></>)
            }
        </Card>
    )
}

export default Comment