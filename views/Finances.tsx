
import React from 'react';
import { LegacyData, AttachedFile } from '../types';
import { DollarSign, Building2, CreditCard, PieChart, Shield, GraduationCap, Link2 } from 'lucide-react';
import FileAttachmentGroup from '../FileAttachmentGroup'; // Import the new component

const Finances: React.FC<{ data: LegacyData, updateData: (fn: (p: LegacyData) => LegacyData) => void }> = ({ data, updateData }) => {
  const handleChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      if (parent === 'lifeInsurance') {
        updateData(prev => ({
          ...prev,
          finances: {
            ...prev.finances,
            lifeInsurance: { ...prev.finances.lifeInsurance, [child]: value }
          }
        }));
      }
    } else {
      updateData(prev => ({
        ...prev,
        finances: { ...prev.finances, [field]: value }
      }));
    }
  };

  const handleLifeInsuranceFilesUpdate = (newFiles: AttachedFile[]) => {
    updateData(prev => ({
      ...prev,
      finances: {
        ...prev.finances,
        lifeInsurance: { ...prev.finances.lifeInsurance, attachedFiles: newFiles }
      }
    }));
  };

  const handleSpreadsheetFilesUpdate = (newFiles: AttachedFile[]) => {
    updateData(prev => ({
      ...prev,
      finances: {
        ...prev.finances,
        attachedSpreadsheetFiles: newFiles
      }
    }));
  };


  return (
    <div className="space-y-8 pb-12">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">Financial Ecosystem</h2>
        <p className="text-slate-500">Bank accounts, investments, and life insurance policies.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FinanceCard 
          icon={<Building2 className="text-blue-500" />}
          label="Banking Institutions"
          placeholder="Banks (Checking, Savings, Money Markets)"
          value={data.finances.banks}
          onChange={(v) => handleChange('banks', v)}
        />
        <FinanceCard 
          icon={<PieChart className="text-indigo-500" />}
          label="Brokerage & Retirement"
          placeholder="Brokerage accounts, IRAs, 401ks at Vanguard/Fidelity etc."
          value={data.finances.brokerage}
          onChange={(v) => handleChange('brokerage', v)}
        />
        <FinanceCard 
          icon={<CreditCard className="text-slate-500" />}
          label="Credit Cards"
          placeholder="Primary cards (Chase, Amex, etc.)"
          value={data.finances.creditCards}
          onChange={(v) => handleChange('creditCards', v)}
        />
        <FinanceCard 
          icon={<GraduationCap className="text-emerald-500" />}
          label="529 Education Plans"
          placeholder="Custodian and state info"
          value={data.finances.fiveTwoNine}
          onChange={(v) => handleChange('fiveTwoNine', v)}
        />
      </div>

      <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="text-amber-400" />
          <h3 className="text-xl font-bold">Life Insurance</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Input 
            label="Death Benefit Amount" 
            dark value={data.finances.lifeInsurance.benefit} 
            onChange={(v) => handleChange('lifeInsurance.benefit', v)} 
          />
          <Input 
            label="Insurance Company" 
            dark value={data.finances.lifeInsurance.company} 
            onChange={(v) => handleChange('lifeInsurance.company', v)} 
          />
          <Input 
            label="Annual/Monthly Premiums" 
            dark value={data.finances.lifeInsurance.premiums} 
            onChange={(v) => handleChange('lifeInsurance.premiums', v)} 
          />
          <div className="md:col-span-2">
            <label className="block text-indigo-300 text-xs uppercase font-bold mb-2">Instructions to Cash Out Policy</label>
            <textarea
              value={data.finances.lifeInsurance.instructions}
              onChange={(e) => handleChange('lifeInsurance.instructions', e.target.value)}
              className="w-full bg-indigo-950/50 border border-indigo-800 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 outline-none text-sm min-h-[80px]"
              placeholder="Contacts, policy numbers, or portal links..."
            />
          </div>
        </div>
        <div className="pt-4 border-t border-indigo-800">
          <FileAttachmentGroup
            files={data.finances.lifeInsurance.attachedFiles}
            onFilesUpdate={handleLifeInsuranceFilesUpdate}
            categoryLabel="for Life Insurance Policy"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-800">Tracking & Connections</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
              <Link2 size={16} className="text-slate-400" /> Linked Financial Apps
            </label>
            <input 
              value={data.finances.linkedApps} 
              onChange={(e) => handleChange('linkedApps', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm"
              placeholder="Monarch, Copilot, Mint..."
            />
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Link2 size={16} className="text-slate-400" /> Balance Sheet Link
            </label>
            <input 
              value={data.finances.spreadsheetLink} 
              onChange={(e) => handleChange('spreadsheetLink', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm"
              placeholder="Google Sheets / Notion link..."
            />
            <div className="pt-2 border-t border-slate-100">
              <FileAttachmentGroup
                files={data.finances.attachedSpreadsheetFiles}
                onFilesUpdate={handleSpreadsheetFilesUpdate}
                categoryLabel="for Balance Sheet"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FinanceCard: React.FC<{ icon: React.ReactNode, label: string, placeholder: string, value: string, onChange: (v: string) => void }> = ({ icon, label, placeholder, value, onChange }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      <h3 className="font-bold text-slate-800">{label}</h3>
    </div>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full min-h-[100px] p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm resize-none"
    />
  </div>
);

const Input: React.FC<{ label: string, value: string, onChange: (v: string) => void, dark?: boolean }> = ({ label, value, onChange, dark }) => (
  <div>
    <label className={`block text-xs uppercase font-bold mb-2 ${dark ? 'text-indigo-300' : 'text-slate-500'}`}>{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded-xl p-3 text-sm focus:ring-2 outline-none ${
        dark 
          ? 'bg-indigo-950/50 border border-indigo-800 text-white focus:ring-amber-500' 
          : 'bg-slate-50 border border-slate-200 text-slate-900 focus:ring-blue-500'
      }`}
    />
  </div>
);

export default Finances;