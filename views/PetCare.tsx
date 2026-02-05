
import React from 'react';
import { LegacyData } from '../types';
import { PawPrint, Heart, ShoppingBag, ShieldPlus, Scissors } from 'lucide-react';

const PetCare: React.FC<{ data: LegacyData, updateData: (fn: (p: LegacyData) => LegacyData) => void }> = ({ data, updateData }) => {
  const handleChange = (field: keyof typeof data.petCare, value: string) => {
    updateData(prev => ({
      ...prev,
      petCare: { ...prev.petCare, [field]: value }
    }));
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <PawPrint size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Pet Care</h2>
          <p className="text-slate-500">How to care for our furry family members.</p>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <PetField 
          icon={<Heart className="text-red-400" />}
          label="Primary Vet Care"
          value={data.petCare.provider}
          onChange={(v) => handleChange('provider', v)}
          placeholder="Vet name, clinic, and contact info..."
        />
        <PetField 
          icon={<ShoppingBag className="text-amber-500" />}
          label="Food & Schedule"
          value={data.petCare.food}
          onChange={(v) => handleChange('food', v)}
          placeholder="Brand, quantity, and feeding times..."
        />
        <PetField 
          icon={<ShieldPlus className="text-blue-500" />}
          label="Medications"
          value={data.petCare.medications}
          onChange={(v) => handleChange('medications', v)}
          placeholder="Names, dosages, and pharmacy info..."
        />
        <PetField 
          icon={<PawPrint className="text-indigo-500" />}
          label="Dog Sitter / Walker"
          value={data.petCare.dogsitter}
          onChange={(v) => handleChange('dogsitter', v)}
          placeholder="Who to call when you need help?"
        />
        <div className="md:col-span-2">
          <PetField 
            icon={<Scissors className="text-pink-400" />}
            label="Grooming"
            value={data.petCare.grooming}
            onChange={(v) => handleChange('grooming', v)}
            placeholder="Preferred groomer and schedule..."
          />
        </div>
      </div>
    </div>
  );
};

const PetField: React.FC<{ icon: React.ReactNode, label: string, value: string, onChange: (v: string) => void, placeholder: string }> = ({ icon, label, value, onChange, placeholder }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
    <div className="flex items-center gap-2">
      {icon}
      <h3 className="font-bold text-slate-800">{label}</h3>
    </div>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full min-h-[100px] p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all text-sm resize-none"
      placeholder={placeholder}
    />
  </div>
);

export default PetCare;
