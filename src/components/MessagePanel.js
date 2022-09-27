import Button from 'react-bootstrap/Button';
import '../styles/messages.css'


const MessagePanel = () => {
    return(
        <div className="messages-panel">
            <Button variant='primary' className='message-btn'> + </Button>
            <div className='message-container'>

            </div>
        </div>
    )
}

export default MessagePanel