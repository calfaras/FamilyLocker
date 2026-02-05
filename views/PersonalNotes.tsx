
import React from 'react';
import { LegacyData } from '../types';
import { Heart } from 'lucide-react';

const PersonalNotes: React.FC<{ data: LegacyData, updateData: (fn: (p: LegacyData) => LegacyData) => void }> = ({ data, updateData }) => {
  const handleChange = (field: keyof typeof data.personalNotes, value: string) => {
    updateData(prev => ({
      ...prev,
      personalNotes: { ...prev.personalNotes, [field]: value }
    }));
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
          <Heart size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Personal Notes</h2>
          <p className="text-slate-500">Your heart and values, expressed in your own words.</p>
        </div>
      </header>

      <div className="space-y-6">
        <NoteField 
          label="Letter to Spouse / Partner" 
          description="Encouragement, love, shared intentions, and future hopes."
          value={data.personalNotes.partnerLetter}
          onChange={(v) => handleChange('partnerLetter', v)}
        />
        <NoteField 
          label="Letter to Children" 
          description="Values you want them to carry, memories, and personal advice."
          value={data.personalNotes.childrenLetter}
          onChange={(v) => handleChange('childrenLetter', v)}
        />
        <NoteField 
          label="Document Intentions" 
          description="How to interpret this file and the spirit in which it was created."
          value={data.personalNotes.intentions}
          onChange={(v) => handleChange('intentions', v)}
        />
      </div>
    </div>
  );
};

const NoteField: React.FC<{ label: string, description: string, value: string, onChange: (v: string) => void }> = ({ label, description, value, onChange }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-focus-within ring-blue-500/20">
    <label className="block font-bold text-slate-800 mb-1">{label}</label>
    <p className="text-xs text-slate-500 mb-4">{description}</p>
    <p className="text-xs italic text-red-500 mb-4">
      ⚠️ These personal notes are for guidance and context only. Any wishes expressed here that conflict with legally executed estate planning documents (e.g., Wills, Trusts) will not supersede those documents in a court of law.
    </p>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none text-slate-700 leading-relaxed"
      placeholder="Start typing here..."
    />
  </div>
);

export default PersonalNotes;