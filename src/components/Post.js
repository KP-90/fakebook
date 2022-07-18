const Post = (props) => {
    let {info} = props
/*      author
        post_contents
        likes
        date_created
*/
    return(
        <div>
            <h2>Post</h2>
            <p>{info.post_contents}</p>
            <p>posted by {info.author.username}</p>

        </div>
    )
}

export default Post