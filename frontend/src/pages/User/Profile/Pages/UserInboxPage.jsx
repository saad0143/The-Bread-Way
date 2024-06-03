import React from 'react';

const UserInboxPage = () => {
    // Sample data for demonstration
    const conversations = [
        {
            userId: '1',
            userImage: 'http://localhost:8000/saad_1705838202062_461752187.png',
            userName: 'Saad',
            lastMessage: 'Hello, how are you?',
        },
        {
            userId: '2',
            userImage: 'http://localhost:8000/01_1705838178084_463393614.png',
            userName: 'Laiba',
            lastMessage: 'I received the package, thanks!',
        },
        {
            userId: '3',
            userImage: 'http://localhost:8000/saad_1705838202062_461752187.png',
            userName: 'Saad',
            lastMessage: 'Hello, how are you?',
        },
        {
            userId: '4',
            userImage: 'http://localhost:8000/01_1705838178084_463393614.png',
            userName: 'Laiba',
            lastMessage: 'I received the package, thanks!',
        },
        {
            userId: '5',
            userImage: 'http://localhost:8000/saad_1705838202062_461752187.png',
            userName: 'Saad',
            lastMessage: 'Hello, how are you?',
        },
        
    ];

    return (
        <div className='w-full flex justify-center'>
            <div className="w-11/12 mx-auto p-6 bg-gray-100 rounded-md shadow-md overflow-y-auto h-[550px]">
                <h1 className="text-2xl font-semibold mb-4">Inbox Messages</h1>
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
