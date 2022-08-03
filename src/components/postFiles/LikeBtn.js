import { useState } from "react"
import { BsHandThumbsUpFill} from "react-icons/bs"

const LikeBtn = (props) => {
    // Props includes currentUser & post info
    const {currentUser, info} = props
    const [stateChange, setChange] = useState(false)
    
    // Add currentuser id to the likes array of the posts
    const handleLike = () => {
        let likesCopy = info.likes
        likesCopy.push(currentUser._id)
        fetch(`${process.env.REACT_APP_BASE_URL}/edit/${info._id}`, {
            method: 'post', 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...info,
                payload: {
                    likes: likesCopy
                }
            })
        })
        .then(response => {setChange(!stateChange)})

    }
    // Removes the currentuser id from the likes array of the post
    const handleUnlike = () => {
        let likesCopy = info.likes
        let index = likesCopy.indexOf(currentUser._id)
        likesCopy.splice(index, 1)
        fetch(`${process.env.REACT_APP_BASE_URL}/edit/${info._id}`, {
            method: 'post', 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...info,
                payload: {
                    likes: likesCopy
                }
            })
        })
        .then(response => {setChange(!stateChange)})
    }

    // Decides which like button to display depending on if user already liked the post or not.
    let Button = () => {
        if(info.likes.includes(currentUser._id)) {
            return <BsHandThumbsUpFill id='likeBtn' className="likeBtnLiked" onClick={handleUnlike}/>          
        } else {
            return <BsHandThumbsUpFill id='likeBtn' className="likeBtn" onClick={handleLike}/> 
        }
    }

    return(
        <Button />
    )
}

export default LikeBtn