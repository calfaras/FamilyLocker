
import React from 'react';
import { LegacyData } from '../types';
import { Home, Zap, Shield, Wrench, Droplets, Flame, Trash, Plus, Trash2, ShieldCheck, Thermometer } from 'lucide-react';

const Household: React.FC<{ data: LegacyData, updateData: (fn: (p: LegacyData) => LegacyData) => void }> = ({ data, updateData }) => {
  const handleMortgageChange = (field: keyof typeof data.household.mortgage, value: string) => {
    updateData(prev => ({
      ...prev,
      household: { ...prev.household, mortgage: { ...prev.household.mortgage, [field]: value } }
    }));
  };

  const handleUtilityChange = (id: string, field: string, value: string) => {
    updateData(prev => ({
      ...prev,
      household: {
        ...prev.household,
        utilities: prev.household.utilities.map(u => u.id === id ? { ...u, [field]: value } : u)
      }
    }));
  };

  const handleMaintenanceChange = (id: string, field: string, value: string) => {
    updateData(prev => ({
      ...prev,
      household: {
        ...prev.household,
        maintenance: prev.household.maintenance.map(m => m.id === id ? { ...m, [field]: value } : m)
      }
    }));
  };

  const handleHVACChange = (field: keyof typeof data.household.hvac, value: string) => {
    updateData(prev => ({
      ...prev,
      household: { ...prev.household, hvac: { ...prev.household.hvac, [field]: value } }
    }));
  };

  return (
    <div className="space-y-12 pb-20">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">Household Operations</h2>
        <p className="text-slate-500">Everything needed to keep the home running smoothly.</p>
      </header>

      {/* Mortgage & Insurance */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Home className="text-blue-500" />
            <h3 className="font-bold text-slate-800">Mortgage</h3>
          </div>
          <Input label="Lender / Company" value={data.household.mortgage.company} onChange={(v) => handleMortgageChange('company', v)} />
          <Input label="Monthly PITI" value={data.household.mortgage.monthly} onChange={(v) => handleMortgageChange('monthly', v)} />
          <Input label="Website / Portal" value={data.household.mortgage.website} onChange={(v) => handleMortgageChange('website', v)} />
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="text-amber-400" />
            <h3 className="font-bold">Home Security</h3>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Safe Word</label>
            <input 
              value={data.household.security.safeWord} 
              onChange={(e) => updateData(p => ({ ...p, household: { ...p.household, security: { ...p.household.security, safeWord: e.target.value } } }))}
              className="w-full bg-slate-800 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Alarm Code</label>
            <input 
              value={data.household.security.alarmCode} 
              onChange={(e) => updateData(p => ({ ...p, household: { ...p.household, security: { ...p.household.security, alarmCode: e.target.value } } }))}
              className="w-full bg-slate-800 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none font-mono"
            />
          </div>
        </div>
      </section>

      {/* Utilities */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Zap size={20} className="text-amber-500" /> Utilities
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {data.household.utilities.map(u => (
            <div key={u.id} className="bg-white p-4 rounded-2xl border border-slate-200">
              <input 
                value={u.type}
                onChange={(e) => handleUtilityChange(u.id, 'type', e.target.value)}
                className="font-bold text-slate-800 w-full mb-3 bg-transparent border-none p-0 focus:ring-0"
              />
              <div className="space-y-2">
                <input placeholder="Provider" value={u.provider} onChange={(e) => handleUtilityChange(u.id, 'provider', e.target.value)} className="w-full text-xs p-2 bg-slate-50 rounded border-none" />
                <input placeholder="Approx Cost" value={u.cost} onChange={(e) => handleUtilityChange(u.id, 'cost', e.target.value)} className="w-full text-xs p-2 bg-slate-50 rounded border-none" />
                <input placeholder="Website" value={u.website} onChange={(e) => handleUtilityChange(u.id, 'website', e.target.value)} className="w-full text-xs p-2 bg-slate-50 rounded border-none" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Maintenance */}
      <section className="space-y-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Wrench size={20} className="text-indigo-500" /> Maintenance Contacts
        </h3>
        <div className="space-y-3">
          {data.household.maintenance.map(m => (
            <div key={m.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-4 items-center">
              <input value={m.type} onChange={(e) => handleMaintenanceChange(m.id, 'type', e.target.value)} className="font-bold text-slate-700 w-32 border-none focus:ring-0" />
              <input placeholder="Company Name" value={m.company} onChange={(e) => handleMaintenanceChange(m.id, 'company', e.target.value)} className="flex-1 bg-slate-50 rounded-lg p-2 text-sm border-none" />
              <input placeholder="Contact/Phone" value={m.contact} onChange={(e) => handleMaintenanceChange(m.id, 'contact', e.target.value)} className="flex-1 bg-slate-50 rounded-lg p-2 text-sm border-none" />
              <input placeholder="Notes" value={m.notes} onChange={(e) => handleMaintenanceChange(m.id, 'notes', e.target.value)} className="flex-1 bg-slate-50 rounded-lg p-2 text-sm border-none" />
            </div>
          ))}
        </div>
      </section>

      {/* HVAC */}
      <section className="bg-blue-50 p-6 rounded-3xl border border-blue-100 space-y-4">
        <h3 className="font-bold text-blue-900 flex items-center gap-2">
          <Thermometer size={20} /> HVAC Systems
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-blue-600 uppercase">Last Filter Change</label>
            <input value={data.household.hvac.lastFilterChange} onChange={(e) => handleHVACChange('lastFilterChange', e.target.value)} className="w-full bg-white rounded-lg p-2 text-sm border-none shadow-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-blue-600 uppercase">Installed By</label>
            <input value={data.household.hvac.installedBy} onChange={(e) => handleHVACChange('installedBy', e.target.value)} className="w-full bg-white rounded-lg p-2 text-sm border-none shadow-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-blue-600 uppercase">Warranty Info</label>
            <input value={data.household.hvac.warranty} onChange={(e) => handleHVACChange('warranty', e.target.value)} className="w-full bg-white rounded-lg p-2 text-sm border-none shadow-sm" />
          </div>
        </div>
      </section>
    </div>
  );
};

const Input: React.FC<{ label: string, value: string, onChange: (v: string) => void }> = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <label className="text-[10px] text-slate-400 font-bold uppercase">{label}</label>
    <input 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-50 border-none rounded-xl p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>
);

export default Household;
