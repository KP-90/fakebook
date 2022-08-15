import { useState } from "react"
import { useSelector } from "react-redux"
import '../../styles/timeline.css'

import Post from "./Post"

const Timeline = (props) => {

    let {allPosts} = props
    
    let Content = () => {
        if(!allPosts || allPosts.length < 1) {
            return <p>No posts by this user yet.</p>
        }
    }

    return(
        <div className="timeline">
            <h3>Timeline</h3>
            <Content />
            <div className="container posts">
                {allPosts ? allPosts.map((post, i) => {
                    return <Post key={i} info={post} stateChange={props.stateChange} setChange={props.setChange}/>
                }) : <p>Loading...</p>}
            </div>
            
        </div>
    )
}

export default Timeline