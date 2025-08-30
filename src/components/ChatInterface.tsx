'use client';

import { useState, useEffect, useRef } from 'react';
import { Language, Message } from '@/types';
import { getRoleName, getSystemPrompt } from '@/lib/arabic-personas';
import { sendAIMessage } from '@/lib/ai-config';

interface ChatInterfaceProps {
  role: string;
  onClose: () => void;
  language: Language;
}

const content = {
  ar: {
    connected: 'متصل - جاهز للمساعدة',
    typing: 'يكتب...',
    messagePlaceholder: 'اكتب رسالتك هنا...',
    send: 'إرسال'
  },
  en: {
    connected: 'Connected - Ready to Help',
    typing: 'Typing...',
    messagePlaceholder: 'Type your message here...',
    send: 'Send'
  }
};

export default function ChatInterface({ role, onClose, language }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = content[language];
  const roleName = getRoleName(role, language);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Send welcome message
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      content: getWelcomeMessage(),
      sender: 'ai',
      timestamp: new Date(),
      role
    };
    setMessages([welcomeMessage]);
  }, [role, language]);

  const getWelcomeMessage = () => {
    const welcomeMessages: Record<Language, Record<string, string>> = {
      ar: {
        CEO: 'مرحباً، أنا المدير التنفيذي الذكي. كيف يمكنني مساعدتك في إدارة الشركة اليوم؟',
        Accountant: 'أهلاً، أنا المحاسب الذكي. لدي تحليل مالي مفصل وجاهز لمساعدتك في الأمور المحاسبية.',
        HR: 'مرحباً، أنا مسؤول الموارد البشرية الذكي. كيف يمكنني مساعدتك في إدارة شؤون الموظفين؟',
        Legal: 'أهلاً، أنا المستشار القانوني الذكي. جاهز لمراجعة العقود والنواحي القانونية.'
      },
      en: {
        CEO: 'Hello, I\'m the intelligent CEO. How can I help you manage the company today?',
        Accountant: 'Hello, I\'m the intelligent accountant. I have detailed financial analysis ready to help you with accounting matters.',
        HR: 'Hello, I\'m the intelligent HR manager. How can I help you with employee management?',
        Legal: 'Hello, I\'m the intelligent legal advisor. Ready to review contracts and legal matters.'
      }
    };
    return welcomeMessages[language][role] || 'مرحباً! كيف يمكنني مساعدتك؟';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      role
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Prepare conversation context
      const conversationMessages = [
        {
          role: 'system',
          content: getSystemPrompt(role, language)
        },
        ...messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
        {
          role: 'user',
          content: inputMessage
        }
      ];

      const aiResponse = await sendAIMessage(conversationMessages);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        role
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: language === 'ar' 
          ? 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.'
          : 'Sorry, there was a connection error. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
        role
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 z-50">
      <div className="h-full flex flex-col">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-4 flex items-center justify-between border-b border-yellow-500/30">
          <div className="flex items-center">
            <button
              onClick={onClose}
              className={`text-yellow-400 hover:text-yellow-300 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}
            >
              <i className={`fas fa-arrow-${language === 'ar' ? 'right' : 'left'} text-xl`}></i>
            </button>
            <div>
              <h2 className="text-white font-bold font-[Tajawal]">{roleName}</h2>
              <p className="text-yellow-300 text-sm">
                {isTyping ? t.typing : t.connected}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
              <i className="fas fa-phone"></i>
            </button>
            <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-800/30 backdrop-blur-sm">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' 
                  ? (language === 'ar' ? 'justify-start' : 'justify-end')
                  : (language === 'ar' ? 'justify-end' : 'justify-start')
                }`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                  } ${
                    message.sender === 'user'
                      ? (language === 'ar' ? 'rounded-br-sm' : 'rounded-bl-sm')
                      : (language === 'ar' ? 'rounded-bl-sm' : 'rounded-br-sm')
                  } animate-fade-in`}
                >
                  <p className="text-sm leading-relaxed font-[Tajawal]">{message.content}</p>
                  <div className={`text-xs opacity-70 mt-2 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-300'
                  }`}>
                    {message.timestamp.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className={`flex ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 border-t border-gray-700/50">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.messagePlaceholder}
              className="flex-1 bg-gray-700/50 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-500 placeholder-gray-400 font-[Tajawal]"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center min-w-[50px]"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}