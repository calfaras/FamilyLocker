
import React from 'react';
import { LegacyData } from '../types';
import { Users, Phone, Mail, Plus, Trash2 } from 'lucide-react';

const ProfessionalTeam: React.FC<{ data: LegacyData, updateData: (fn: (p: LegacyData) => LegacyData) => void }> = ({ data, updateData }) => {
  const handleChange = (id: string, field: string, value: string) => {
    updateData(prev => ({
      ...prev,
      professionalTeam: prev.professionalTeam.map(t => t.id === id ? { ...t, [field]: value } : t)
    }));
  };

  const addMember = () => {
    const newMember = { id: Date.now().toString(), role: 'New Role', name: '', phone: '', email: '' };
    updateData(prev => ({
      ...prev,
      professionalTeam: [...prev.professionalTeam, newMember]
    }));
  };

  const removeMember = (id: string) => {
    updateData(prev => ({
      ...prev,
      professionalTeam: prev.professionalTeam.filter(t => t.id !== id)
    }));
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Professional Team</h2>
          <p className="text-slate-500">The people who will handle the transition.</p>
        </div>
        <button 
          onClick={addMember}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-colors text-sm font-medium"
        >
          <Plus size={16} /> Add Contact
        </button>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {data.professionalTeam.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 group">
            <div className="flex justify-between items-start">
              <input 
                value={member.role}
                onChange={(e) => handleChange(member.id, 'role', e.target.value)}
                className="font-bold text-blue-600 bg-transparent border-none p-0 focus:ring-0 w-full"
                placeholder="Role (e.g. Attorney)"
              />
              <button 
                onClick={() => removeMember(member.id)}
                className="text-slate-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <input 
              value={member.name}
              onChange={(e) => handleChange(member.id, 'name', e.target.value)}
              className="w-full text-lg font-bold text-slate-800 bg-slate-50 border-none rounded-lg px-2 py-1"
              placeholder="Name"
            />

            <div className="space-y-2">
              <div className="flex items-center gap-3 text-slate-600">
                <Phone size={16} className="text-slate-400" />
                <input 
                  value={member.phone}
                  onChange={(e) => handleChange(member.id, 'phone', e.target.value)}
                  className="bg-transparent border-none p-0 text-sm focus:ring-0 w-full"
                  placeholder="Phone"
                />
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Mail size={16} className="text-slate-400" />
                <input 
                  value={member.email}
                  onChange={(e) => handleChange(member.id, 'email', e.target.value)}
                  className="bg-transparent border-none p-0 text-sm focus:ring-0 w-full"
                  placeholder="Email"
                />
              </div>
            </div>
            
            <div className="flex gap-2 pt-2">
              <a href={`tel:${member.phone}`} className="flex-1 flex justify-center py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                <Phone size={14} />
              </a>
              <a href={`mailto:${member.email}`} className="flex-1 flex justify-center py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                <Mail size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalTeam;
