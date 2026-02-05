
import React from 'react';
import { LegacyData } from '../types';
import { Clock, Lock, ShieldAlert, BookOpen, LifeBuoy, Printer, ShieldCheck, ArrowRight, User, MapPin, Briefcase, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Overview: React.FC<{ data: LegacyData, recoveryKey: string, updateData: (fn: (p: LegacyData) => LegacyData) => void }> = ({ data, recoveryKey, updateData }) => {
  const completedSteps = data.firstSteps.filter(s => s.completed).length;
  const totalSteps = data.firstSteps.length;

  const handleCreatorDetailsChange = (field: keyof typeof data.creatorDetails, value: string) => {
    updateData(prev => ({
      ...prev,
      creatorDetails: { ...prev.creatorDetails, [field]: value }
    }));
  };

  const handleLocalServicesToggle = (checked: boolean) => {
    updateData(prev => ({
      ...prev,
      wantsLocalServicesInfo: checked,
      localServicesNotes: checked ? prev.localServicesNotes : '' 
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-slate-900">Your Family Locker Vault</h2>
        <p className="text-slate-500 mt-2">A centralized, encrypted resource to guide your loved ones when it matters most.</p>
      </header>

      {/* Creator Contact Information */}
      <section className="space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <User size={16} /> Creator Details
        </h3>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Legal Name</label>
            <input
              type="text"
              value={data.creatorDetails.legalName}
              onChange={(e) => handleCreatorDetailsChange('legalName', e.target.value)}
              placeholder="John Doe"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Address</label>
            <input
              type="text"
              value={data.creatorDetails.address}
              onChange={(e) => handleCreatorDetailsChange('address', e.target.value)}
              placeholder="123 Main St"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">State</label>
            <input
              type="text"
              value={data.creatorDetails.state}
              onChange={(e) => handleCreatorDetailsChange('state', e.target.value)}
              placeholder="CA"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Zip Code</label>
            <input
              type="text"
              value={data.creatorDetails.zipCode}
              onChange={(e) => handleCreatorDetailsChange('zipCode', e.target.value)}
              placeholder="90210"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 rounded"
              checked={data.wantsLocalServicesInfo}
              onChange={(e) => handleLocalServicesToggle(e.target.checked)}
            />
            <span className="text-slate-700 font-medium">
              Enable a section for me to **manually record** local professional services information (Estate Planning, Financial, Tax, Legal, etc.).
            </span>
          </label>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/manual" className="group bg-blue-600 text-white p-6 rounded-2xl shadow-lg border border-blue-500 transition-all hover:bg-blue-700">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/30 text-white rounded-xl">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="font-bold">Start Here: Resource Manual</h3>
              <p className="text-sm text-blue-100">Understand the 'Why' behind this plan.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-80 group-hover:opacity-100">
            Read the Guide <ArrowRight size={14} />
          </div>
        </Link>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Immediate Actions</h3>
              <p className="text-sm text-slate-500">{completedSteps} of {totalSteps} items reviewed</p>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-amber-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(completedSteps / totalSteps) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="bg-indigo-900 text-white p-8 rounded-3xl overflow-hidden relative shadow-xl">
        <div className="relative z-10 grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <LifeBuoy size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Safety Net</span>
            </div>
            <h3 className="text-2xl font-bold">Have you printed your Rescue Kit?</h3>
            <p className="text-indigo-200 text-sm leading-relaxed">
              If your survivors don't know your master passphrase, they will need the <strong>Recovery Key</strong> stored in your Rescue Kit. Without it, this data is lost forever.
            </p>
            <Link 
              to="/rescue"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-indigo-950 font-bold px-6 py-3 rounded-xl transition-all shadow-lg"
            >
              <Printer size={18} /> View & Print Rescue Kit
            </Link>
          </div>
          <div className="bg-indigo-950/50 p-6 rounded-2xl border border-indigo-800 flex flex-col justify-center">
            <h4 className="font-bold text-amber-400 mb-2 flex items-center gap-2">
              <ShieldCheck size={18} /> Recovery Key Status
            </h4>
            <div className="font-mono text-sm bg-indigo-950 p-3 rounded-lg border border-indigo-700 text-indigo-300 tracking-wider mb-4">
              {recoveryKey ? recoveryKey : 'Not Generated'}
            </div>
            <p className="text-[10px] text-indigo-400 italic">
              Keep this key physical. Do not store it digitally on an unencrypted drive.
            </p>
          </div>
        </div>
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-800 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 flex items-start gap-4">
        <ShieldAlert className="text-amber-600 mt-1 shrink-0" />
        <div className="text-sm text-slate-800">
          <strong className="text-slate-900 block mb-1 font-bold">The Golden Rule of Privacy</strong>
          <p className="leading-relaxed">
            Your data is never uploaded to any server. It exists only in this browser and the backups you export. If you clear your browser data and lose both your passphrase AND your recovery key, <strong>nobody on earth can recover this information.</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
