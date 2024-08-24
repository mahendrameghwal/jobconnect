import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import './chat.css';
import Allchats from './Allchats';
import SingleChat from './Singlechat';
import { useParams } from 'react-router-dom';
import {
  useCurrentUserQuery,
  useUserDetailQuery,
  useMultipleUserDetailQuery
} from '../../../app/api/authApi';
import io from 'socket.io-client';
import baseURL from '../../api/instance';


const Chat = () => {
  const [isChecked, setIsChecked] = useState(true);
  const { recipient } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const { data: currentUserData } = useCurrentUserQuery();
  const messagesEndRef = useRef(null);
  const [ChatUser,SetChatUser] = useState([]);
  const [OnlineUser, setOnlineUser] = useState([]);

  const { data: userInfo, isLoading: loadingUserInfo } =
    useUserDetailQuery(recipient);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (currentUserData?.candidate) {
      setCurrentUserId(currentUserData.candidate._id);
    } else if (currentUserData?.Org) {
      setCurrentUserId(currentUserData.Org._id);
    }
  }, [currentUserData]);
  const fetchMessages = useCallback(async () => {
    try {
      const response = await baseURL.get('getmessage', {
        params: { senderId: currentUserId, receiverId: recipient },
        withCredentials: true,
      });
      setMessages(response.data);
    } catch (error) {
      alert(error.message);
    }
  }, [currentUserId, recipient]);
    const {data:AllchattingUserInformation, error:AllchattingUserError} = useMultipleUserDetailQuery(ChatUser);
  
  const GetchatUser = useCallback(async () => {
    try {
      const response = await baseURL.get('chatuser', {
        params: { senderId: currentUserId},
        withCredentials: true,
      });
      SetChatUser(response.data);
    } catch (error) {
      alert(error.message);
    }
  }, [currentUserId]);

 
 


  useEffect(() => {
    if (currentUserId) {
      fetchMessages();
      GetchatUser()
      
      socketRef.current = io(import.meta.env.VITE_SERVER_URL);
      socketRef.current.emit('join', currentUserId);
      socketRef.current.on('newMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socketRef.current.on('userStatusChanged', ({ userId, online }) =>
       { setOnlineUser((prevUsers=>{return online ?  [...prevUsers, userId] : prevUsers.filter(id => id !== userId)})) });

      socketRef.current.on('catchUpMessages', (CatchUpuser) => {
        setOnlineUser((prevUser) => [...CatchUpuser, ...prevUser]);
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [currentUserId, fetchMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }, [messages]);

  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMessage.trim() || !recipient.trim()) return;

      socketRef.current.emit('sendMessage', {
        senderId: currentUserId,
        receiverId: recipient,
        message: newMessage,
        onModel: currentUserData?.Isorg ? 'Org' : 'candidate',
      });

      setNewMessage('');
    },
    [newMessage, recipient, currentUserId,],
  );

  return (
    <section className="flex flex-row  ">
      {isChecked ?(
        <Allchats
          recipient={recipient}
          setIsChecked={setIsChecked}
          isChecked={isChecked}
          handleCheckboxChange={handleCheckboxChange}
          AllchattingUserInformation={AllchattingUserInformation}
          AllchattingUserError={AllchattingUserError}
        />
      ):null}
      <SingleChat 
        OnlineUser={OnlineUser}
        messagesEndRef={messagesEndRef}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        currentUserId={currentUserId}
        userInfo={userInfo}
        sendMessage={sendMessage}
        messages={messages}
        setIsChecked={setIsChecked}
        isChecked={isChecked}
        handleCheckboxChange={handleCheckboxChange}
      />
    </section>
  );
};

export default memo(Chat);
