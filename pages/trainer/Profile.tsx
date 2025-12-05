import React, { useState } from 'react';
import { GlassCard } from '../../components/GlassCard';
import { Camera, Save, MapPin, Mail, Phone, Briefcase, Calendar, Upload, FileText, Clock } from 'lucide-react';

const TrainerProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Morgan",
    designation: "Senior Technical Trainer",
    phone: "+1 555 0123 456",
    email: "alex.morgan@gmail.com",
    wisecrewId: "alex.m@wisecrew.com",
    location: "San Francisco, CA",
    timings: "10:00 AM - 07:00 PM",
    days: "Mon - Fri",
    skills: ["Full Stack Dev", "Cloud Architecture", "Python", "DevOps"],
    address: "42 Tech Avenue, Silicon Valley, CA 94000",
    avatarUrl: "https://picsum.photos/id/1005/200/200"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Trainer Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-6 py-2 rounded-xl font-medium shadow-lg transition-all ${
            isEditing 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-teal-500 hover:bg-teal-600 text-white'
          }`}
        >
          {isEditing ? <span className="flex items-center gap-2"><Save size={18} /> Save Details</span> : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Photo Card */}
        <GlassCard className="md:col-span-1 flex flex-col items-center space-y-4">
           <div className="relative group">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/50 shadow-xl">
                <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                <Camera size={32} />
                <input type="file" className="hidden" accept="image/*" />
              </label>
           </div>
           <div className="text-center">
             <h2 className="text-xl font-bold text-gray-800 dark:text-white">{profile.name}</h2>
             <p className="text-teal-600 dark:text-teal-400 font-medium">{profile.designation}</p>
           </div>
           
           <div className="w-full pt-4 border-t border-gray-200 dark:border-gray-700">
             <div className="flex items-center justify-between text-sm mb-2">
               <span className="text-gray-500 dark:text-gray-400">Resume</span>
               <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Uploaded</span>
             </div>
             <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-gray-400 text-gray-600 dark:text-gray-300 hover:bg-white/10 transition-colors">
               <Upload size={16} /> <span className="text-sm">Update Resume</span>
             </button>
           </div>
        </GlassCard>

        {/* Info Card */}
        <GlassCard className="md:col-span-2 space-y-4">
           <h3 className="text-lg font-bold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Details</h3>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
                <input type="text" name="name" value={profile.name} disabled={!isEditing} onChange={handleChange} className="w-full p-2 rounded bg-transparent border border-gray-200 dark:border-gray-700 disabled:border-transparent text-gray-800 dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Designation</label>
                <input type="text" name="designation" value={profile.designation} disabled={!isEditing} onChange={handleChange} className="w-full p-2 rounded bg-transparent border border-gray-200 dark:border-gray-700 disabled:border-transparent text-gray-800 dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">WiseCrew Mail ID</label>
                <div className="flex items-center gap-2">
                   <Mail size={16} className="text-gray-400" />
                   <input type="text" name="wisecrewId" value={profile.wisecrewId} disabled={!isEditing} onChange={handleChange} className="w-full p-2 rounded bg-transparent border border-gray-200 dark:border-gray-700 disabled:border-transparent text-gray-800 dark:text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Personal Email</label>
                <input type="text" name="email" value={profile.email} disabled={!isEditing} onChange={handleChange} className="w-full p-2 rounded bg-transparent border border-gray-200 dark:border-gray-700 disabled:border-transparent text-gray-800 dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Phone</label>
                 <div className="flex items-center gap-2">
                   <Phone size={16} className="text-gray-400" />
                   <input type="text" name="phone" value={profile.phone} disabled={!isEditing} onChange={handleChange} className="w-full p-2 rounded bg-transparent border border-gray-200 dark:border-gray-700 disabled:border-transparent text-gray-800 dark:text-white" />
                 </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Location</label>
                 <div className="flex items-center gap-2">
                   <MapPin size={16} className="text-gray-400" />
                   <input type="text" name="location" value={profile.location} disabled={!isEditing} onChange={handleChange} className="w-full p-2 rounded bg-transparent border border-gray-200 dark:border-gray-700 disabled:border-transparent text-gray-800 dark:text-white" />
                 </div>
              </div>
           </div>
           
           <div className="pt-2">
              <label className="text-xs font-semibold text-gray-500 uppercase">Availability</label>
              <div className="flex flex-wrap gap-4 mt-2">
                 <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 px-3 py-2 rounded-lg">
                    <Clock size={16} className="text-teal-500" />
                    <span className="text-sm text-gray-800 dark:text-white">{profile.timings}</span>
                 </div>
                 <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 px-3 py-2 rounded-lg">
                    <Calendar size={16} className="text-teal-500" />
                    <span className="text-sm text-gray-800 dark:text-white">{profile.days}</span>
                 </div>
              </div>
           </div>

           <div className="pt-2">
              <label className="text-xs font-semibold text-gray-500 uppercase">Skills</label>
              <div className="flex flex-wrap gap-2 mt-2">
                 {profile.skills.map((skill, i) => (
                   <span key={i} className="px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-sm">{skill}</span>
                 ))}
              </div>
           </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default TrainerProfile;