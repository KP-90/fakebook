// This will be the modal to show messages to and from userA and userB
import { Button, Card, Form, Modal } from "react-bootstrap"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Message = (props) => {
    const currentUser = useSelector(state => state.userInfo.user)
    const {friend} = props

    const [loaded, setLoad] = useState(false)

    const [show, setShow] = useState(false);
    const [messages, setMessages] = useState([])

    const handleClose = () => {
        setLoad(false)
        setShow(false)
    };
    const handleShow = (e) => {
        removeAlert(e)
        setLoad(true)
        setShow(true)
    };

    const removeAlert = (e) => {
        let test = e.target.querySelector(".new-message-alert")
        if(test.innerText != " ") {
            test.innerText = " "
        }
    }

    useEffect(() => {
        if(loaded) {
            const checkEnter = (e) => {
                console.log("CHECKING")
                if(e.key === "Enter") {
                    return sendMessage()
                }
            }
    
            const sendMessage = () => {
                console.log("Message sending")
                let text = document.querySelector("#messageTextInput")
                let textObject = {'text': text.value, 'author': currentUser.id}
                let temp = messages
                temp.push(textObject)
                setMessages(temp)
                text.value = ''
            }
    
            // Add event listeners
            let inputText = document.querySelector("#messageTextInput")
            let sendBtn = document.querySelector("#sendBtn")
            inputText.addEventListener("keyup", checkEnter)
            sendBtn.addEventListener("click", sendMessage)
        }
    }, [loaded, messages, setMessages])
    

    let PopulateMessages = () => {
        if(messages.length > 0){
            console.log(messages)
            return messages.map((mess, i) => {
                return <p key={i}>{mess.text}</p>
            })
        }
        return <></>
    }

    return(
        <>
        <Card className="person" onClick={handleShow}>
            <Card.Body>
                <div className="person-details">
                    <h5>{friend.display_name}</h5>
                    <h5 className="new-message-alert">NEW</h5>
                </div>
            </Card.Body>
        </Card>
        
        <Modal show={show} size='xl' onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{friend.display_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="messages-modal">
                    <PopulateMessages />
                </div>
                <div className="messages-inputs">
                    <input id="messageTextInput" type='text'></input>
                    <button id="sendBtn">Send</button>
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default Message