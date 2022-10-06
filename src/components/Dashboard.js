// Section of the page below the Header. Will hold most, if not all, of the main frontpage content.
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Form } from "react-bootstrap"
import { changePosts } from "../redux/userSlice"
// import components
import SidePanel from "./SidePanel"
import Timeline from "./postFiles/Timeline"
import MessagePanel from "./messageFiles/MessagePanel"
import '../styles/dashboard.css'


const Dashboard = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.userInfo.user)
    const allPosts = useSelector(state => state.userInfo.allPosts)
    const [stateChange, setChange] = useState(false)


    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}`, {mode: 'cors'})
        .then(response => response.json())
        .then(data => {
            dispatch(changePosts(data.results))
        })
    }, [stateChange])

    const HandleSubmit = (e) => {
        e.preventDefault()
        let text = document.querySelector("textarea")
        fetch(`${process.env.REACT_APP_BASE_URL}/submitPost`, {
            method: 'post', 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: currentUser._id,
                post_contents: text.value
            })})
        .then(response => response.json())
        .then(data => {
            if(data.ok) {
                setChange(!stateChange)
                text.value = ''
            }
        })
    }

    return(
        <div className="dashboard">
            <SidePanel />
            <div>
                <h2>Hello, {currentUser.first}</h2>
                <div className="form-container">
                    <Form onSubmit={HandleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control as="textarea" rows={4} placeholder="Say something..." />
                            <Button type="submit">Submit</Button>
                        </Form.Group>
                    </Form>
                </div>
                <Timeline allPosts={allPosts} setChange={setChange} stateChange={stateChange}/>
            </div>
            <MessagePanel friends={currentUser.friends} />
        </div>
        
    )
}

export default Dashboard