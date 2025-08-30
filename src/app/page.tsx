'use client';

import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/components/Dashboard';
import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'chat'>('dashboard');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('dashboard');
    setSelectedRole('');
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setCurrentView('chat');
  };

  const handleChatClose = () => {
    setCurrentView('dashboard');
    setSelectedRole('');
  };

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    
    // Update HTML attributes
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  if (!isLoggedIn) {
    return (
      <LoginForm 
        onLogin={handleLogin} 
        language={language}
        onLanguageToggle={toggleLanguage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {currentView === 'dashboard' ? (
        <Dashboard 
          onRoleSelect={handleRoleSelect}
          onLogout={handleLogout}
          language={language}
          onLanguageToggle={toggleLanguage}
        />
      ) : (
        <ChatInterface
          role={selectedRole}
          onClose={handleChatClose}
          language={language}
        />
      )}
    </div>
  );
}