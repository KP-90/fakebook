import { useState } from "react"
import { useSelector } from "react-redux"
import '../../styles/timeline.css'

import Post from "./Post"

const Timeline = ({allPosts}) => {

    const [stateChange, setChange] = useState(false)

    return(
        <div className="timeline">
            <h3>Timeline</h3>
            <div className="container posts">
                {allPosts ? allPosts.map((post, i) => {
                    return <Post key={i} info={post} stateChange={stateChange} setChange={setChange}/>
                }) : <p>Loading...</p>}
            </div>
            
        </div>
    )
}

export default Timeline