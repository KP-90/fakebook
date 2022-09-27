import { useEffect, useState } from "react"
import { BsHandThumbsUpFill} from "react-icons/bs"

const LikeBtn = (props) => {
    // Props includes currentUser & post info
    const {currentUser, info} = props
    const [stateChange, setChange] = useState(false)
    const [likesCopy, setLikesCopy] = useState([...info.likes])
    
    // Add currentuser id to the likes array of the posts
    // Copies the likesCopy array, adds the users id and sends an update to the API.
    // Upon API response, triggers a re-render of the component
    const handleLike = () => {
        let temp = likesCopy
        temp.push(currentUser._id)
        fetch(`${process.env.REACT_APP_BASE_URL}/edit/${info._id}`, {
            method: 'post', 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...info,
                payload: {
                    likes: temp
                }
            })
        })
        .then(response => {
            setLikesCopy(temp)
            setChange(!stateChange)
        })
    }
    // Removes the currentuser id from the likes array of the post
    const handleUnlike = () => {
        let index = likesCopy.indexOf(currentUser._id)
        let temp = likesCopy
        temp.splice(index, 1)
        fetch(`${process.env.REACT_APP_BASE_URL}/edit/${info._id}`, {
            method: 'post', 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...info,
                payload: {
                    likes: temp
                }
            })
        })
        .then(response => {
            setLikesCopy(temp)
            setChange(!stateChange) // Forces re-render
        })
    }

    // Decides which like button to display depending on if user already liked the post or not.
    let Button = () => {
        if(likesCopy.includes(currentUser._id)) {
            return <BsHandThumbsUpFill id='likeBtn' className="likeBtnLiked" onClick={handleUnlike}/>          
        } else {
            return <BsHandThumbsUpFill id='likeBtn' className="likeBtn" onClick={handleLike}/> 
        }
    }

    return(
        <div style={{display: 'flex'}}>
            <p style={{position: 'relative', top: "3px"}}>{likesCopy.length} likes</p>
            <Button />
        </div>
        
    )
}

export default LikeBtn