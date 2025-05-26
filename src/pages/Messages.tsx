
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send, ArrowLeft, Phone, Video, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockConversations = [
  {
    id: '1',
    name: 'Sarah Johnson',
    lastMessage: 'The new design looks great! Can we discuss the API integration?',
    time: '2 min ago',
    unread: 2,
    avatar: '/placeholder.svg',
    online: true
  },
  {
    id: '2',
    name: 'Development Team',
    lastMessage: 'Mike: Great work on the sprint, everyone!',
    time: '15 min ago',
    unread: 0,
    avatar: '/placeholder.svg',
    online: false,
    isGroup: true
  },
  {
    id: '3',
    name: 'David Kim',
    lastMessage: 'Thanks for the code review feedback',
    time: '1 hour ago',
    unread: 0,
    avatar: '/placeholder.svg',
    online: true
  }
];

const mockMessages = [
  {
    id: '1',
    sender: 'Sarah Johnson',
    content: 'Hey! How\'s the progress on the new feature?',
    time: '10:30 AM',
    isMe: false
  },
  {
    id: '2',
    sender: 'You',
    content: 'Going well! I\'ve finished the UI components and working on the backend integration now.',
    time: '10:32 AM',
    isMe: true
  },
  {
    id: '3',
    sender: 'Sarah Johnson',
    content: 'That\'s awesome! Can you share a screenshot of the current progress?',
    time: '10:35 AM',
    isMe: false
  },
  {
    id: '4',
    sender: 'You',
    content: 'Sure! I\'ll send it over in a few minutes.',
    time: '10:36 AM',
    isMe: true
  }
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  const goBackToDashboard = () => {
    navigate('/');
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Conversations Sidebar */}
      <div className="w-1/3 border-r border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goBackToDashboard}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Messages</h2>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              className="pl-10 dark:bg-slate-800 dark:text-white dark:border-slate-700"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto h-full">
          {mockConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b border-slate-100 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                selectedConversation.id === conversation.id ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {conversation.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                      {conversation.name}
                      {conversation.isGroup && (
                        <Badge variant="secondary" className="ml-2 text-xs">Group</Badge>
                      )}
                    </h3>
                    <span className="text-xs text-slate-500">{conversation.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unread > 0 && (
                      <Badge className="bg-blue-500 text-white text-xs">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedConversation.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {selectedConversation.name}
                </h3>
                <p className="text-sm text-slate-500">
                  {selectedConversation.online ? 'Online' : 'Last seen 2 hours ago'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isMe
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.isMe ? 'text-blue-100' : 'text-slate-500'}`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 dark:bg-slate-800 dark:text-white dark:border-slate-700"
            />
            <Button onClick={sendMessage} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
