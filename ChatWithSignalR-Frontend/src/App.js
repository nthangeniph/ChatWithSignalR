import './App.css';
import 'react-bootstrap';
import { useState } from 'react';
import Lobby from './components/lobby';
import Chat from './components/Chat';
import {HubConnectionBuilder,LogLevel } from '@microsoft/signalr';

const App = () => {


  const [connection, setConnection] = useState();
  const [messages,setMessages] = useState([]);

  
  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:5001/chathub")
        .configureLogging(LogLevel.Information)
        .build()
      connection.on("ReceiveMessage", (user, message) => {
      console.log('connection',connection?.connectionId)
      setMessages(msgs => [...msgs, { user, message }])
        
      });
      connection.onclose(e => {
        setConnection();
        setMessages([]);
       })

      await connection.start();
      await connection.invoke('JoinRoom', { user, room });
      setConnection(connection);
    } catch (e) {
      console.log('something went wrong',e)
    }
  }


  const leaveRoom = async (user, room) => {
    try {

      await connection.invoke('LeaveRoom', { user, room });
    
    } catch (e) {
      console.log('something went wrong',e)
    }
  }


  const sendMessage = async (message) => {

    try {
      await connection.invoke('SendMessage', message);
    } catch(e) {
      console.log(e)
    }
  }
  
  const closeConnection = async () => {
    try {
      await connection.stop();
      
    } catch(e) {
      console.log('something went wrong during disconnect',e)
    }
  }

  return (
    <div className='app'>
      <h2>MyChat</h2>
      <hr className='line' />
      {!connection
        ? <Lobby joinRoom={joinRoom} leaveRoom={leaveRoom} />
        : <Chat
          messages={messages}
          sendMessage={sendMessage}
          closeConnection={closeConnection}/>
      }
  
     
     
    </div>
  )

}

export default App;
