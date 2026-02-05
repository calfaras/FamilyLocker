
import React from 'react';
import { ShieldAlert, Printer, LifeBuoy, ArrowLeft, Key, Lock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const RescueKit: React.FC<{ recoveryKey: string }> = ({ recoveryKey }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Non-print UI */}
      <div className="print:hidden space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Rescue Kit</h2>
              <p className="text-slate-500">Your physical safety net for emergency access.</p>
            </div>
          </div>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all font-bold shadow-lg"
          >
            <Printer size={18} /> Print Kit
          </button>
        </header>

        <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl flex gap-4">
          <LifeBuoy className="text-blue-600 shrink-0" />
          <div className="text-sm text-blue-800 leading-relaxed">
            <strong>Why do I need this?</strong> This kit is for your loved ones. If they cannot access your phone or computer, or if you are unavailable to provide your passphrase, they can use the <strong>Recovery Key</strong> below to unlock this vault from any device.
          </div>
        </div>
      </div>

      {/* Printable Area */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-12 shadow-sm space-y-12 print:border-none print:shadow-none print:p-0">
        <div className="text-center space-y-4 pb-8 border-b-2 border-slate-100">
          <div className="flex justify-center">
            <ShieldAlert size={64} className="text-amber-500" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Survivor's Rescue Kit</h1>
          <p className="text-slate-500 font-medium uppercase">Family Locker: Legacy Plan Access</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 print:grid-cols-1">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Globe size={20} className="text-blue-500" /> 1. Access the App
            </h3>
            <p className="text-sm text-slate-600">
              Open a web browser on a secure computer and navigate to the application URL or use the saved HTML file.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center font-bold text-blue-600 select-all">
              Family Locker Vault
              <span className="block text-[10px] text-slate-400 mt-1 uppercase">(Access via local backup or host URL)</span>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Key size={20} className="text-amber-500" /> 2. Enter Recovery Key
            </h3>
            <p className="text-sm text-slate-600">
              Click <strong>"Use Recovery Key instead"</strong> on the lock screen and enter:
            </p>
            <div className="bg-slate-900 p-6 rounded-xl text-center">
              <span className="text-2xl font-mono font-black text-amber-400 tracking-widest">
                {recoveryKey}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Lock size={20} className="text-emerald-500" /> Master Passphrase (Physical Backup)
          </h3>
          <p className="text-sm text-slate-600">
            If you know the creator's master passphrase, write it here for future reference. 
            <strong> Warning:</strong> Keep this document in a high-security physical location (e.g., a home safe).
          </p>
          <div className="h-16 border-2 border-dashed border-slate-300 rounded-xl flex items-center px-4 italic text-slate-300">
            Write passphrase here...
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 pt-8">
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800">For the Survivor:</h4>
            <ul className="text-xs text-slate-500 space-y-2 list-disc pl-4">
              <li>Navigate to "First Steps" immediately upon entry.</li>
              <li>Use the "Professional Team" section to contact advisors.</li>
              <li>Data is decrypted locally; no internet is required once the app is loaded.</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800">Security Details:</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-widest font-bold">
              Encryption: AES-256 GCM <br/>
              Derivation: PBKDF2 (100,000 Iterations) <br/>
              Standard: E2EE Local Vault
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
            Generated on {new Date().toLocaleDateString()} — Store this physical copy securely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RescueKit;
