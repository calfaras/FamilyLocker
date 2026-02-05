
import React from 'react';
import { LegacyData } from '../types';
import { Smartphone, Share2, Cloud, Globe } from 'lucide-react';

const DigitalItems: React.FC<{ data: LegacyData, updateData: (fn: (p: LegacyData) => LegacyData) => void }> = ({ data, updateData }) => {
  const handleChange = (field: keyof typeof data.digitalItems, value: string) => {
    updateData(prev => ({
      ...prev,
      digitalItems: { ...prev.digitalItems, [field]: value }
    }));
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">Digital Life</h2>
        <p className="text-slate-500">Access to devices, social media, and online assets.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <DigitalCard 
          icon={<Smartphone className="text-blue-500" />}
          label="Phone Access"
          fields={[
            { id: 'phoneCarrier', label: 'Carrier', placeholder: 'Verizon/AT&T/T-Mobile' },
            { id: 'phonePin', label: 'PIN / Passcode', placeholder: '6-digit code' },
          ]}
          data={data.digitalItems}
          onChange={handleChange}
        />
        <DigitalCard 
          icon={<Share2 className="text-pink-500" />}
          label="Social Media"
          fields={[
            { id: 'socialMediaInstructions', label: 'Memorialization Preferences', placeholder: 'Memorialize, delete, or preserve accounts?' },
          ]}
          data={data.digitalItems}
          onChange={handleChange}
          large
        />
        <DigitalCard 
          icon={<Cloud className="text-sky-500" />}
          label="Cloud Storage"
          fields={[
            { id: 'cloudStorage', label: 'Primary Services', placeholder: 'Google Photos, iCloud, Dropbox links...' },
          ]}
          data={data.digitalItems}
          onChange={handleChange}
          large
        />
        <DigitalCard 
          icon={<Globe className="text-indigo-500" />}
          label="Domains & Websites"
          fields={[
            { id: 'domainLogins', label: 'Owned Properties', placeholder: 'GoDaddy, Namecheap, Blog logins...' },
          ]}
          data={data.digitalItems}
          onChange={handleChange}
          large
        />
      </div>
    </div>
  );
};

const DigitalCard: React.FC<{ 
  icon: React.ReactNode, 
  label: string, 
  fields: Array<{ id: string, label: string, placeholder: string }>, 
  data: any, 
  onChange: (f: any, v: string) => void,
  large?: boolean
}> = ({ icon, label, fields, data, onChange, large }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
    <div className="flex items-center gap-3">
      {icon}
      <h3 className="font-bold text-slate-800">{label}</h3>
    </div>
    <div className="space-y-4">
      {fields.map(f => (
        <div key={f.id}>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">{f.label}</label>
          {large ? (
            <textarea
              value={data[f.id]}
              onChange={(e) => onChange(f.id as any, e.target.value)}
              placeholder={f.placeholder}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
            />
          ) : (
            <input
              type="text"
              value={data[f.id]}
              onChange={(e) => onChange(f.id as any, e.target.value)}
              placeholder={f.placeholder}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default DigitalItems;
