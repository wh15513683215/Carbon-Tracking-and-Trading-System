import React, { useState } from 'react';
import { ChatList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import { generateReportContent } from './Utils/reportUtils'; // 工具函数

const ReportPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage = { type: 'text', text: input, position: 'right' };
    setMessages([...messages, newMessage]);

    // 调用 GPT-4 生成报告内容
    const reportContent = await generateReportContent(input);
    const responseMessage = { type: 'text', text: reportContent, position: 'left' };
    
    setMessages([...messages, newMessage, responseMessage]);
    setInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflow: 'auto', padding: '10px' }}>
        <ChatList
          className='chat-list'
          dataSource={messages.map((msg, index) => ({
            avatar: msg.position === 'left' ? 'bot_avatar_url' : 'user_avatar_url',
            title: msg.position === 'left' ? 'ChatGPT Bot' : 'You',
            subtitle: msg.text,
            date: new Date(),
            unread: 0,
            position: msg.position,
          }))}
        />
      </div>
      <div style={{ padding: '10px', borderTop: '1px solid #ccc' }}>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          style={{ width: '80%', padding: '10px' }}
        />
        <button onClick={handleSend} style={{ padding: '10px', marginLeft: '10px' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ReportPage;
