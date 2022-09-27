import Card from 'react-bootstrap/Card';

import Message from './messageFiles/Message';
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
            return(<Message friend={friend} key={i + friend.username}/>)
        })
    }

    return(
        <div className="messages-panel">
            <h2>Messages</h2>
            <div className='message-container'>
                <FriendList />
            </div>
        </div>
    )
}

export default MessagePanel