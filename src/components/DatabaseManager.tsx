'use client';

import { useState } from 'react';
import { Language } from '@/types';

interface DatabaseManagerProps {
  onClose: () => void;
  language: Language;
}

const content = {
  ar: {
    title: 'إدارة قواعد البيانات',
    employees: 'الموظفين',
    contracts: 'العقود',
    projects: 'المشاريع',
    addNew: 'إضافة جديد',
    search: 'البحث...',
    name: 'الاسم',
    position: 'المنصب',
    department: 'القسم',
    salary: 'الراتب',
    status: 'الحالة',
    actions: 'الإجراءات',
    edit: 'تعديل',
    delete: 'حذف',
    close: 'إغلاق',
    active: 'نشط',
    inactive: 'غير نشط',
    noData: 'لا توجد بيانات'
  },
  en: {
    title: 'Database Management',
    employees: 'Employees',
    contracts: 'Contracts',
    projects: 'Projects',
    addNew: 'Add New',
    search: 'Search...',
    name: 'Name',
    position: 'Position',
    department: 'Department',
    salary: 'Salary',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    close: 'Close',
    active: 'Active',
    inactive: 'Inactive',
    noData: 'No data available'
  }
};

const getMockEmployees = (lang: Language) => [
  {
    id: '1',
    name: lang === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
    position: lang === 'ar' ? 'مهندس مدني' : 'Civil Engineer',
    department: lang === 'ar' ? 'الهندسة' : 'Engineering',
    salary: 15000,
    status: 'active'
  },
  {
    id: '2',
    name: lang === 'ar' ? 'سارة أحمد' : 'Sarah Ahmed',
    position: lang === 'ar' ? 'محاسبة' : 'Accountant',
    department: lang === 'ar' ? 'المالية' : 'Finance',
    salary: 12000,
    status: 'active'
  },
  {
    id: '3',
    name: lang === 'ar' ? 'محمد علي' : 'Mohammed Ali',
    position: lang === 'ar' ? 'مدير مشروع' : 'Project Manager',
    department: lang === 'ar' ? 'إدارة المشاريع' : 'Project Management',
    salary: 18000,
    status: 'active'
  }
];

export default function DatabaseManager({ onClose, language }: DatabaseManagerProps) {
  const [activeTab, setActiveTab] = useState('employees');
  const [searchTerm, setSearchTerm] = useState('');

  const t = content[language];
  const mockEmployees = getMockEmployees(language);

  const filteredEmployees = mockEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-4 flex justify-between items-center border-b border-yellow-500/30">
        <div className="flex items-center">
          <button
            onClick={onClose}
            className={`text-yellow-400 hover:text-yellow-300 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}
          >
            <i className={`fas fa-arrow-${language === 'ar' ? 'right' : 'left'} text-xl`}></i>
          </button>
          <h1 className="text-white font-bold text-xl font-[Tajawal]">{t.title}</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800/50 p-4 border-b border-gray-700/50">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('employees')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'employees'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
            }`}
          >
            <i className="fas fa-users mr-2"></i>
            {t.employees}
          </button>
          <button
            onClick={() => setActiveTab('contracts')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'contracts'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
            }`}
          >
            <i className="fas fa-file-contract mr-2"></i>
            {t.contracts}
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'projects'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
            }`}
          >
            <i className="fas fa-building mr-2"></i>
            {t.projects}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Search and Add */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
            />
          </div>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <i className="fas fa-plus mr-2"></i>
            {t.addNew}
          </button>
        </div>

        {/* Table */}
        {activeTab === 'employees' && (
          <div className="bg-gray-800/30 rounded-lg overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-white font-medium">{t.name}</th>
                    <th className="px-4 py-3 text-left text-white font-medium">{t.position}</th>
                    <th className="px-4 py-3 text-left text-white font-medium">{t.department}</th>
                    <th className="px-4 py-3 text-left text-white font-medium">{t.salary}</th>
                    <th className="px-4 py-3 text-left text-white font-medium">{t.status}</th>
                    <th className="px-4 py-3 text-left text-white font-medium">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600/50">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-700/30">
                        <td className="px-4 py-3 text-white">{employee.name}</td>
                        <td className="px-4 py-3 text-gray-300">{employee.position}</td>
                        <td className="px-4 py-3 text-gray-300">{employee.department}</td>
                        <td className="px-4 py-3 text-gray-300">{employee.salary.toLocaleString()} ريال</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            employee.status === 'active'
                              ? 'bg-green-600/20 text-green-400'
                              : 'bg-red-600/20 text-red-400'
                          }`}>
                            {employee.status === 'active' ? t.active : t.inactive}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button className="text-blue-400 hover:text-blue-300">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="text-red-400 hover:text-red-300">
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                        {t.noData}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {(activeTab === 'contracts' || activeTab === 'projects') && (
          <div className="bg-gray-800/30 rounded-lg p-8 text-center backdrop-blur-sm">
            <i className="fas fa-database text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-400 text-lg">{t.noData}</p>
            <p className="text-gray-500 text-sm mt-2">هذا القسم قيد التطوير</p>
          </div>
        )}
      </div>
    </div>
  );
}