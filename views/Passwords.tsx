
import React, { useState } from 'react';
import { LegacyData, ManualAccount } from '../types';
import { Key, Eye, EyeOff, Lock, Info, Plus, Trash2, ShieldAlert } from 'lucide-react';

const COMMON_EMAIL_SERVICES = [
  "Gmail",
  "Yahoo Mail",
  "Outlook/Hotmail",
  "iCloud Mail",
  "Proton Mail",
  "AOL Mail",
  "GMX Mail",
  "Zoho Mail",
];

const Passwords: React.FC<{ data: LegacyData, updateData: (fn: (p: LegacyData) => LegacyData) => void }> = ({ data, updateData }) => {
  const [showMasterPassword, setShowMasterPassword] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const handleMasterChange = (field: keyof typeof data.passwords, value: string) => {
    updateData(prev => ({
      ...prev,
      passwords: { ...prev.passwords, [field]: value }
    }));
  };

  const addAccount = () => {
    const newAccount: ManualAccount = {
      id: Date.now().toString(),
      service: '',
      username: '',
      password: '',
      notes: ''
    };
    updateData(prev => ({
      ...prev,
      manualAccounts: [...(prev.manualAccounts || []), newAccount]
    }));
  };

  const updateAccount = (id: string, field: keyof ManualAccount, value: string) => {
    updateData(prev => ({
      ...prev,
      manualAccounts: prev.manualAccounts.map(acc => acc.id === id ? { ...acc, [field]: value } : acc)
    }));
  };

  const removeAccount = (id: string) => {
    updateData(prev => ({
      ...prev,
      manualAccounts: prev.manualAccounts.filter(acc => acc.id !== id)
    }));
  };

  const toggleVisibility = (id: string) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">Passwords & Logins</h2>
        <p className="text-slate-500">Securely store access to your digital life.</p>
      </header>

      {/* Primary Password Manager Section */}
      <section className="space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Master Access (Recommended)</h3>
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Lock size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Master Vault</span>
            </div>
            
            <div className="grid gap-6">
              <div>
                <label className="block text-slate-400 text-xs uppercase font-bold mb-2">Password Manager (e.g. 1Password)</label>
                <input
                  type="text"
                  value={data.passwords.manager}
                  onChange={(e) => handleMasterChange('manager', e.target.value)}
                  placeholder="LastPass / 1Password / Apple Keychain"
                  className="w-full bg-slate-800 border-none rounded-xl p-3 text-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs uppercase font-bold mb-2">Username / Email</label>
                  <input
                    type="text"
                    value={data.passwords.username}
                    onChange={(e) => handleMasterChange('username', e.target.value)}
                    placeholder="name@email.com"
                    className="w-full bg-slate-800 border-none rounded-xl p-3 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div className="relative">
                  <label className="block text-slate-400 text-xs uppercase font-bold mb-2">Master Password</label>
                  <div className="relative">
                    <input
                      type={showMasterPassword ? "text" : "password"}
                      value={data.passwords.masterPassword}
                      onChange={(e) => handleMasterChange('masterPassword', e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-slate-800 border-none rounded-xl p-3 pr-12 focus:ring-2 focus:ring-amber-500 outline-none font-mono"
                    />
                    <button 
                      onClick={() => setShowMasterPassword(!showMasterPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                      {showMasterPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-5 -mb-8 -mr-8 pointer-events-none">
            <Key size={300} />
          </div>
        </div>
      </section>

      {/* Manual Individual Accounts Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Individual Accounts</h3>
            <p className="text-xs text-slate-500 italic">For those who don't use a manager or for critical individual backups.</p>
          </div>
          <button 
            onClick={addAccount}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-all text-sm font-bold shadow-lg"
          >
            <Plus size={16} /> Add Account
          </button>
        </div>

        {data.manualAccounts && data.manualAccounts.length > 0 ? (
          <div className="grid gap-4">
            {data.manualAccounts.map((acc) => (
              <div key={acc.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 group relative">
                <button 
                  onClick={() => removeAccount(acc.id)}
                  className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors p-2"
                  title="Remove Account"
                >
                  <Trash2 size={18} />
                </button>

                <div className="grid md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Service / Website</label>
                    <input
                      type="text"
                      list="common-email-services" // Link to the datalist
                      value={acc.service}
                      onChange={(e) => updateAccount(acc.id, 'service', e.target.value)}
                      placeholder="e.g., Gmail, Amazon"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <datalist id="common-email-services">
                      {COMMON_EMAIL_SERVICES.map((service, index) => (
                        <option key={index} value={service} />
                      ))}
                    </datalist>
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Username</label>
                    <input
                      type="text"
                      value={acc.username}
                      onChange={(e) => updateAccount(acc.id, 'username', e.target.value)}
                      placeholder="Email or handle"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Password</label>
                    <div className="relative">
                      <input
                        type={visiblePasswords[acc.id] ? "text" : "password"}
                        value={acc.password}
                        onChange={(e) => updateAccount(acc.id, 'password', e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 pr-10 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                      />
                      <button 
                        onClick={() => toggleVisibility(acc.id)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {visiblePasswords[acc.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Notes</label>
                    <input
                      type="text"
                      value={acc.notes}
                      onChange={(e) => updateAccount(acc.id, 'notes', e.target.value)}
                      placeholder="Security questions, etc."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-8 rounded-3xl text-center">
            <p className="text-slate-400 text-sm">No individual accounts added yet. If you don't use a password manager, add your critical logins here.</p>
          </div>
        )}
      </section>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4">
        <Info className="text-blue-500 shrink-0" />
        <div className="text-sm text-slate-600 leading-relaxed">
          <strong>Security Note:</strong> Your data is encrypted with your master passphrase. However, storing individual passwords manually increases risk if your master passphrase is weak or compromised.
        </div>
      </div>
    </div>
  );
};

export default Passwords;
