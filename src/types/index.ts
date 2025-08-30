export interface User {
  id: string;
  username: string;
  role: 'admin' | 'manager' | 'employee';
  companyName: string;
}

export interface AIRole {
  id: string;
  name: {
    ar: string;
    en: string;
  };
  icon: string;
  color: string;
  description: {
    ar: string;
    en: string;
  };
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  role?: string;
}

export interface DatabaseEntity {
  id: string;
  name: string;
  data: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Employee extends DatabaseEntity {
  data: {
    name: string;
    position: string;
    department: string;
    salary: number;
    joinDate: string;
    status: 'active' | 'inactive';
    phone: string;
    email: string;
  };
}

export interface Contract extends DatabaseEntity {
  data: {
    title: string;
    clientName: string;
    value: number;
    startDate: string;
    endDate: string;
    status: 'active' | 'completed' | 'pending';
    description: string;
  };
}

export interface Project extends DatabaseEntity {
  data: {
    name: string;
    location: string;
    budget: number;
    progress: number;
    startDate: string;
    expectedEndDate: string;
    status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
    manager: string;
    description: string;
  };
}

export type Language = 'ar' | 'en';

export interface LanguageContent {
  ar: string;
  en: string;
}