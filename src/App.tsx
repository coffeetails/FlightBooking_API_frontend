import { useState } from 'react';
import axios from 'axios';
import './App.css'

interface Message {
  id: number;
  content: string;
  sender: string;
}

function App() {
  const axiosInstance = axios.create({ baseURL: 'http://localhost:8080/api/ai' });

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage: Message = { id: Date.now(), content: input, sender: 'User' };
    
    try {
      //const response = await axios.post('https://your-api-endpoint.com/api/messages', newMessage);
      const response = await axiosInstance.get(
        '/chat',
        {
          params: {
            chatId: 105,
            question: newMessage.content
          }
        }
      );
      setMessages([...messages, newMessage, { id: Date.now(), content: response.data, sender: 'FlightAssist' }]);
      console.log("all messages: ", messages);
      
      setInput('');
      
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <main className="chatWindow">
        <section className="chatWindow-wrapper">
          {messages.map(message => (
            <p key={message.id}>
              <strong>{message.sender}:</strong> {message.content}
            </p>
          ))}
        </section>
        
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ width: '80%', padding: '5px' }}
        />
        <button onClick={sendMessage}>Send</button>
      </main>
    </>
  )
}

export default App
