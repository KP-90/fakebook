import Card from 'react-bootstrap/Card';

import NewMessage from './messageFiles/NewMessage';
import '../styles/messages.css'


const MessagePanel = (props) => {
    // props { friends }
    console.log(props)
    if(props.friends.length < 1) {
        return(
            <div className="messages-panel">No Friends</div>
        )
    }

    const FriendList = () => {
        return props.friends.map((friend, i) => {
            return(<Card key={i} className='person'>
                <Card.Body><h4>{friend.display_name}</h4></Card.Body>
            </Card>)
        })
    }

    return(
        <div className="messages-panel">
            <h2>Messages</h2>
            <NewMessage />
            <div className='message-container'>
                <FriendList />
            </div>
        </div>
    )
}

export default MessagePanel