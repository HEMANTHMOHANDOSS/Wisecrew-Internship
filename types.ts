export type UserRole = 'student' | 'trainer' | 'admin';

export interface StudentProfile {
  name: string;
  registerNumber: string;
  year: string;
  department: string;
  college: string;
  projectTitle: string;
  projectProgress: number;
  internalGuide: string;
  internalGuideContact: string;
  parentContact: string;
  personalEmail: string;
  collegeEmail: string;
  phone: string;
  location: string;
  skills: string[];
  avatarUrl?: string;
}

export interface AttendanceRecord {
  id: number;
  date: string;
  time: string;
  status: 'Present' | 'Absent';
  remarks?: string;
}

export interface Doubt {
  id: number;
  subject: string;
  explanation: string;
  githubLink?: string;
  status: 'Pending' | 'Resolved';
  imageUrl?: string;
  replies: {
    sender: 'Student' | 'Trainer';
    message: string;
    timestamp: string;
  }[];
}

export interface NavItem {
  label: string;
  path: string;
  icon: React.FC<any>;
}