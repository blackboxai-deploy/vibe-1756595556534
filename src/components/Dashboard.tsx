'use client';

import { useState } from 'react';
import { Language } from '@/types';
import { AI_ROLES } from '@/lib/arabic-personas';
import DatabaseManager from './DatabaseManager';

interface DashboardProps {
  onRoleSelect: (role: string) => void;
  onLogout: () => void;
  language: Language;
  onLanguageToggle: () => void;
}

const content = {
  ar: {
    companyName: 'شركة المقاولات الذكية',
    systemName: 'نظام الإدارة المتكامل',
    databaseManagement: 'إدارة قواعد البيانات',
    quickActions: 'إجراءات سريعة',
    employeeDatabase: 'قاعدة الموظفين',
    contractsDatabase: 'قاعدة العقود',
    projectsDatabase: 'قاعدة المشاريع',
    importData: 'استيراد بيانات',
    generateReport: 'تقرير مالي',
    scheduleMeeting: 'اجتماع افتراضي',
    notifications: {
      dbAccess: 'فتح إدارة قاعدة البيانات',
      importStarted: 'بدء عملية استيراد البيانات',
      importSuccess: 'تم استيراد البيانات بنجاح',
      reportGenerated: 'تم إنشاء التقرير المالي',
      meetingScheduled: 'تم تحضير الاجتماع الافتراضي'
    }
  },
  en: {
    companyName: 'Smart Construction Company',
    systemName: 'Integrated Management System',
    databaseManagement: 'Database Management',
    quickActions: 'Quick Actions',
    employeeDatabase: 'Employee Database',
    contractsDatabase: 'Contracts Database',
    projectsDatabase: 'Projects Database',
    importData: 'Import Data',
    generateReport: 'Financial Report',
    scheduleMeeting: 'Virtual Meeting',
    notifications: {
      dbAccess: 'Opening database management',
      importStarted: 'Starting data import',
      importSuccess: 'Data imported successfully',
      reportGenerated: 'Financial report generated',
      meetingScheduled: 'Virtual meeting scheduled'
    }
  }
};

export default function Dashboard({ onRoleSelect, onLogout, language, onLanguageToggle }: DashboardProps) {
  const [showDatabase, setShowDatabase] = useState(false);
  const [notification, setNotification] = useState<string>('');

  const t = content[language];

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleDatabaseAccess = (type: string) => {
    showNotification(t.notifications.dbAccess + ': ' + type);
    setShowDatabase(true);
  };

  const handleImportData = () => {
    showNotification(t.notifications.importStarted);
    setTimeout(() => {
      showNotification(t.notifications.importSuccess);
    }, 2000);
  };

  const handleGenerateReport = () => {
    showNotification(t.notifications.reportGenerated);
  };

  const handleScheduleMeeting = () => {
    showNotification(t.notifications.meetingScheduled);
  };

  if (showDatabase) {
    return <DatabaseManager onClose={() => setShowDatabase(false)} language={language} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7cd45f73-b95e-486d-a0f6-c8808c8fe44b.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-4 flex justify-between items-center border-b border-yellow-500/30">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-hard-hat text-white text-xl"></i>
            </div>
            <div className={`${language === 'ar' ? 'mr-3' : 'ml-3'}`}>
              <h2 className="text-white font-bold font-[Tajawal]">{t.companyName}</h2>
              <p className="text-yellow-300 text-sm">{t.systemName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onLanguageToggle}
              className="text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <i className="fas fa-language text-xl"></i>
            </button>
            <button
              onClick={onLogout}
              className="text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <i className="fas fa-sign-out-alt text-xl"></i>
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* AI Roles Grid */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(AI_ROLES).map(([key, role]) => (
                <div
                  key={role.id}
                  onClick={() => onRoleSelect(role.id)}
                  className="role-card bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center cursor-pointer border border-white/20 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-500/20"
                >
                  <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${role.color} rounded-full flex items-center justify-center mb-3 shadow-lg`}>
                    <i className={`${role.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-white font-bold mb-1 font-[Tajawal]">{role.name[language]}</h3>
                  <p className="text-yellow-200 text-sm">{role.description[language]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Database Management */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50">
            <h3 className="text-white font-bold mb-3 flex items-center font-[Tajawal]">
              <i className={`fas fa-database text-yellow-400 ${language === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
              {t.databaseManagement}
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleDatabaseAccess('employees')}
                className="bg-blue-600/80 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center backdrop-blur-sm"
              >
                <i className={`fas fa-user-tie ${language === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                {t.employeeDatabase}
              </button>
              <button
                onClick={() => handleDatabaseAccess('contracts')}
                className="bg-green-600/80 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center backdrop-blur-sm"
              >
                <i className={`fas fa-file-contract ${language === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                {t.contractsDatabase}
              </button>
              <button
                onClick={() => handleDatabaseAccess('projects')}
                className="bg-purple-600/80 hover:bg-purple-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center backdrop-blur-sm"
              >
                <i className={`fas fa-building ${language === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                {t.projectsDatabase}
              </button>
              <button
                onClick={handleImportData}
                className="bg-yellow-600/80 hover:bg-yellow-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center backdrop-blur-sm"
              >
                <i className={`fas fa-file-import ${language === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                {t.importData}
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50">
            <h3 className="text-white font-bold mb-3 flex items-center font-[Tajawal]">
              <i className={`fas fa-bolt text-yellow-400 ${language === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
              {t.quickActions}
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleGenerateReport}
                className="bg-red-600/80 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center backdrop-blur-sm"
              >
                <i className={`fas fa-chart-bar ${language === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                {t.generateReport}
              </button>
              <button
                onClick={handleScheduleMeeting}
                className="bg-indigo-600/80 hover:bg-indigo-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center backdrop-blur-sm"
              >
                <i className={`fas fa-video ${language === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                {t.scheduleMeeting}
              </button>
            </div>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-[Tajawal]">
            {notification}
          </div>
        )}
      </div>
    </div>
  );
}