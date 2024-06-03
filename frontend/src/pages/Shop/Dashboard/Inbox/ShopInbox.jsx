import React, { useRef, useState } from 'react';
import styles from '../../../../style/style';
///import { useSelector } from 'react-redux';

const UserInboxPage = () => {
    // const { seller, isLoading } = useSelector((state) => state.seller);
    // //const [conversations, setConversations] = useState([]);
    // const [arrivalMessage, setArrivalMessage] = useState(null);
    // const [currentChat, setCurrentChat] = useState();
    // const [messages, setMessages] = useState([]);
    // const [userData, setUserData] = useState(null);
    // const [newMessage, setNewMessage] = useState("");
    // const [onlineUsers, setOnlineUsers] = useState([]);
    // const [activeStatus, setActiveStatus] = useState(false);
    // const [images, setImages] = useState();
    // const [open, setOpen] = useState(false);
    // const scrollRef = useRef(null);



    
    const conversations = [
        {
            userId: '1',
            userImage: 'http://localhost:8000/saad_1713233197972_824247957.png',
            userName: 'Saad',
            lastMessage: 'Hello, how are you?',
        },
        {
            userId: '2',
            userImage: 'http://localhost:8000/saad_1713233197972_824247957.png',
            userName: 'Saad',
            lastMessage: 'I received the package, thanks!',
        },
        {
            userId: '3',
            userImage: 'http://localhost:8000/saad_1713233197972_824247957.png',
            userName: 'Saad',
            lastMessage: 'Hello, how are you?',
        },
        {
            userId: '4',
            userImage: 'http://localhost:8000/saad_1713233197972_824247957.png',
            userName: 'Saad',
            lastMessage: 'I received the package, thanks!',
        },
        {
            userId: '5',
            userImage: 'http://localhost:8000/saad_1713233197972_824247957.png',
            userName: 'Saad',
            lastMessage: 'Hello, how are you?',
        },
        {
            userId: '6',
            userImage: 'http://localhost:8000/saad_1713233197972_824247957.png',
            userName: 'Saad',
            lastMessage: 'I received the package, thanks!',
        },
        {
            userId: '7',
            userImage: 'http://localhost:8000/saad_1713233197972_824247957.png',
            userName: 'Saad',
            lastMessage: 'Hello, how are you?',
        },
        {
            userId: '8',
            userImage: 'http://localhost:8000/saad_1713233197972_824247957.png',
            userName: 'Saad',
            lastMessage: 'I received the package, thanks!',
        },
    ];

    return (
        <div className='w-full flex justify-center'>
            <div className="w-full mx-auto bg-gray-100 rounded-md shadow-md overflow-y-auto h-[625px]">
                <h1 className={`${styles.heading}`}>Inbox Messages</h1>
                <ul>
                    {conversations.map((conversation) => (
                        <li
                            key={conversation.userId}
                            className="flex items-center border-b py-4"
                        >
                            <img
                                src={conversation.userImage}
                                alt={`${conversation.userName}'s avatar`}
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">{conversation.userName}</h3>
                                <p className="text-gray-600">{conversation.lastMessage}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserInboxPage;
