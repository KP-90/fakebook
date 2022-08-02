// Section of the page below the Header. Will hold most, if not all, of the main frontpage content.
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Button, Form } from "react-bootstrap"
// import components
import SidePanel from "./SidePanel"
import Timeline from "./postFiles/Timeline"
import '../styles/dashboard.css'


const Dashboard = () => {
    const currentUser = useSelector(state => state.userInfo.user)
    const [stateChange, setChange] = useState(false)
    const [allPosts, setAllPosts] = useState()

    useEffect(() => {
        fetch("http://localhost:4000", {mode: 'cors'})
        .then(response => response.json())
        .then(data => {
            setAllPosts(data.results)
        })
    }, [stateChange])

    const HandleSubmit = (e) => {
        e.preventDefault()
        let text = document.querySelector("textarea")
        fetch('http://localhost:4000/submitPost', {
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
                <Timeline allPosts={allPosts}/>
            </div>
            <div className="blank"></div>
        </div>
        
    )
}

export default Dashboard

// IDEA: incorporate an accordian for the side panel.
// Docs: https://react-bootstrap.github.io/components/accordion/