'use client';

import { useState } from 'react';
import { Language } from '@/types';

interface LoginFormProps {
  onLogin: () => void;
  language: Language;
  onLanguageToggle: () => void;
}

const content = {
  ar: {
    title: 'نظام الإدارة الذكي',
    subtitle: 'لشركات المقاولات والمشاريع الإنشائية',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    usernamePlaceholder: 'أدخل اسم المستخدم',
    passwordPlaceholder: 'أدخل كلمة المرور',
    rememberMe: 'تذكرني',
    loginButton: 'تسجيل الدخول',
    aiVersion: 'نسخة الذكاء الاصطناعي المتكاملة',
    localDatabase: 'قاعدة بيانات محلية',
    aiPowered: 'مدعوم بالذكاء الاصطناعي',
    languageToggle: 'English'
  },
  en: {
    title: 'Smart Management System',
    subtitle: 'For Construction Companies and Projects',
    username: 'Username',
    password: 'Password',
    usernamePlaceholder: 'Enter username',
    passwordPlaceholder: 'Enter password',
    rememberMe: 'Remember me',
    loginButton: 'Sign In',
    aiVersion: 'Integrated AI Version',
    localDatabase: 'Local Database',
    aiPowered: 'AI Powered',
    languageToggle: 'العربية'
  }
};

export default function LoginForm({ onLogin, language, onLanguageToggle }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const t = content[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation - in real app would authenticate
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Construction Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f535365-a7b9-4ddb-a2b7-946f0edce9a4.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-slate-800/90" />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-yellow-500/30">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-hard-hat text-3xl text-white"></i>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 font-[Tajawal]">{t.title}</h1>
            <p className="text-yellow-200">{t.subtitle}</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-yellow-200 mb-2 font-medium">{t.username}</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-yellow-500/30 rounded-lg text-white placeholder-yellow-200/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                placeholder={t.usernamePlaceholder}
                required
              />
            </div>
            
            <div>
              <label className="block text-yellow-200 mb-2 font-medium">{t.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-yellow-500/30 rounded-lg text-white placeholder-yellow-200/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                placeholder={t.passwordPlaceholder}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-yellow-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-yellow-500 text-yellow-600 focus:ring-yellow-500 bg-white/10"
                />
                <span className={`${language === 'ar' ? 'mr-2' : 'ml-2'}`}>{t.rememberMe}</span>
              </label>
              
              <button
                type="button"
                onClick={onLanguageToggle}
                className="text-yellow-200 hover:text-yellow-300 flex items-center transition-colors"
              >
                <i className={`fas fa-language ${language === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                <span>{t.languageToggle}</span>
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              <i className={`fas fa-sign-in-alt ${language === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
              {t.loginButton}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-yellow-200 mb-2">{t.aiVersion}</p>
            <div className="flex justify-center space-x-4">
              <span className="text-yellow-400 text-sm flex items-center">
                <i className="fas fa-database mr-1"></i>
                {t.localDatabase}
              </span>
              <span className="text-yellow-400 text-sm flex items-center">
                <i className="fas fa-robot mr-1"></i>
                {t.aiPowered}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}