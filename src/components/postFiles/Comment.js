import { Card } from "react-bootstrap"
import { useSelector } from "react-redux"

const Comment = (props) => {
    const {comment, comments, setComments} = props
    const currentUser = useSelector(state => state.userInfo.user)

    // Edit the comment
    const handleEdit = () => {
        console.log(comments)
        let copy = comments.splice(comment, 1)
        console.log(copy)

    }

    // Delete the comment
    const handleDelete = (e) => {
        if(window.confirm("Are you sure?")) {
            
            let targetComment = document.getElementById(comment._id)
            let btn = e.target
            let copy = comments.splice(comment, 1) 
            // delete
            fetch(`http://localhost:4000/comments/delete/${comment._id}`, {method:'post', mode: 'cors'})
            .then(response => {
                if(response.ok) {
                    targetComment.classList.add('fadeOutEffect')
                    setTimeout(() => setComments(copy), 1500)
                }
            })
        }
    }

    return(
        <Card id={comment._id}>
            <Card.Title>{comment.author.username} at {comment.date_readable}</Card.Title>
            <Card.Text>{comment.comment}</Card.Text>
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