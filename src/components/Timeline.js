import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useSelector } from "react-redux"

import Post from "./Post"

const Timeline = () => {

    const user = useSelector(state => state.userInfo.user)
    const [stateChange, setChange] = useState(false)
    const [allPosts, setAllPosts] = useState()

    useEffect(() => {
        fetch("http://localhost:4000", {mode: 'cors'})
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setAllPosts(data.results)
        })
    }, [stateChange])

    const HandleSubmit = (e) => {
        e.preventDefault()
        let text = document.querySelector("textarea").value
        fetch('http://localhost:4000/submitPost', {
            method: 'post', 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: user._id,
                post_contents: text
            })})
            .then(response => response.json())
            .then(data => {
                if(data.ok) {
                    setChange(!stateChange)
                }
            })
    }

    return(
        <div className="timeline">
            <h2>Hello, {user.first}</h2>
            <div className="form-container">
                <Form onSubmit={HandleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control as="textarea" rows={4} placeholder="Say something..." />
                        <Button type="submit">Submit</Button>
                    </Form.Group>
                </Form>
            </div>
            <h3>Timeline</h3>
            <div className="container posts">
                {allPosts ? allPosts.map((post, i) => {
                    return <Post key={i} info={post}/>
                }) : <p>Loading....</p>}
            </div>
            
        </div>
    )
}

export default Timeline