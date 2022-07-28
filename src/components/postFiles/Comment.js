import { Button, Card, Form } from "react-bootstrap"
import { useSelector } from "react-redux"

const Comment = (props) => {
    const {comment, comments, change, setChange} = props
    const currentUser = useSelector(state => state.userInfo.user)

    // Edit the comment
    const handleEdit = () => {
        /*
        console.log(comments)
        let copy = comments.splice(comment, 1)
        console.log(copy)
        */
       let parentElement = document.getElementById(`${comment._id}`)
       let textBoxEditor = parentElement.querySelector(".editBox")
       let commentText = parentElement.querySelector("#cardText")
       textBoxEditor.style.display = 'block'
       commentText.style.display = 'none'


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
            <Form>
                <Form.Control as='textarea' className="editBox" rows={2}>{comment.comment}</Form.Control>
                <Form.Group>
                    <Button variant='primary' size='sm'></Button>
                </Form.Group>
            </Form>
            
            <Card.Text id="cardText">{comment.comment}</Card.Text>
            {comment.author._id === currentUser._id ? (
                <Card.Footer className="comment-footer">
                    <p className="fauxLink" onClick={handleEdit}> edit </p> 
                    <p> - </p> 
                    <p id="commentDelete" className="fauxLink" onClick={handleDelete}> delete </p>
                </Card.Footer>) : (<></>)}
        </Card>
    )
}

export default Comment