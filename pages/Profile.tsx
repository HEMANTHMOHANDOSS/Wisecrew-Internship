import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { StudentProfile } from '../types';
import { Camera, Save, MapPin, Mail, Phone, Book } from 'lucide-react';

interface ProfileProps {
  profile: StudentProfile;
  setProfile: (p: StudentProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, setProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData({ ...formData, avatarUrl: event.target.result as string });
          setProfile({ ...profile, avatarUrl: event.target.result as string }); // Instant update
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const InputField = ({ label, name, value, icon: Icon }: any) => (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</label>
      <div className="relative">
        {Icon && <div className="absolute left-3 top-3 text-gray-400"><Icon size={16} /></div>}
        <input
          type="text"
          name={name}
          value={value}
          disabled={!isEditing}
          onChange={handleChange}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2 rounded-lg border ${
            isEditing 
              ? 'bg-white/80 dark:bg-black/40 border-indigo-300 dark:border-indigo-700 focus:ring-2 focus:ring-indigo-500' 
              : 'bg-transparent border-transparent'
          } text-gray-800 dark:text-gray-200 transition-all`}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Profile</h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`px-6 py-2 rounded-xl font-medium shadow-lg transition-all ${
            isEditing 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-indigo-500 hover:bg-indigo-600 text-white'
          }`}
        >
          {isEditing ? <span className="flex items-center gap-2"><Save size={18} /> Save Changes</span> : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Photo Section */}
        <GlassCard className="md:col-span-1 flex flex-col items-center space-y-4">
           <div className="relative group">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/50 shadow-xl">
                <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                <Camera size={32} />
                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              </label>
           </div>
           <div className="text-center">
             <h2 className="text-xl font-bold text-gray-800 dark:text-white">{formData.name}</h2>
             <p className="text-indigo-600 dark:text-indigo-400 font-medium">{formData.registerNumber}</p>
           </div>
        </GlassCard>

        {/* Details Section */}
        <GlassCard className="md:col-span-2">
           <h3 className="text-lg font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 text-gray-800 dark:text-white">Personal Information</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <InputField label="Full Name" name="name" value={formData.name} icon={User} />
             <InputField label="Register Number" name="registerNumber" value={formData.registerNumber} icon={Book} />
             <InputField label="Department" name="department" value={formData.department} />
             <InputField label="Year" name="year" value={formData.year} />
             <InputField label="Location" name="location" value={formData.location} icon={MapPin} />
             <InputField label="Personal Email" name="personalEmail" value={formData.personalEmail} icon={Mail} />
             <InputField label="College Email" name="collegeEmail" value={formData.collegeEmail} icon={Mail} />
             <InputField label="Phone" name="phone" value={formData.phone} icon={Phone} />
             <InputField label="Parent Contact" name="parentContact" value={formData.parentContact} icon={Phone} />
           </div>

           <h3 className="text-lg font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mt-6 mb-4 text-gray-800 dark:text-white">Academic Details</h3>
           <div className="space-y-4">
             <InputField label="College" name="college" value={formData.college} icon={Book} />
             <InputField label="Project Title" name="projectTitle" value={formData.projectTitle} />
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Internal Guide" name="internalGuide" value={formData.internalGuide} icon={User} />
                <InputField label="Guide Contact" name="internalGuideContact" value={formData.internalGuideContact} icon={Mail} />
             </div>
             <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Skills</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.skills.map((skill, idx) => (
                    <span key={idx} className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                  {isEditing && <button className="px-3 py-1 rounded-full border border-dashed border-gray-400 text-gray-500 text-sm hover:border-indigo-500 hover:text-indigo-500">+ Add</button>}
                </div>
             </div>
           </div>
        </GlassCard>
      </div>
    </div>
  );
};

// Simple User Icon helper for the input
const User = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;

export default Profile;