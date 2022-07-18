import { Link } from "react-router-dom"
import { Card } from "react-bootstrap"

const Post = (props) => {
    let {info} = props
/* props contents:
        author
        post_contents
        likes
        date_created
*/
    return(
        <Card>
            <Card.Title>
                <Link to={`/user/${info.author._id}`}>{info.author.username}</Link>
            </Card.Title>
            <Card.Subtitle>Posted: {info.date_created}</Card.Subtitle>
            <Card.Text>{info.post_contents}</Card.Text>

        </Card>
    )
}

export default Post