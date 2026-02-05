
import React from 'react';
import { ShieldCheck, Heart, Key, Smartphone, HardDrive, WifiOff, Lock, ArrowRight, Save, ShieldAlert, BookOpen, AlertCircle } from 'lucide-react';

interface LandingProps {
  hasVault: boolean;
  onContinue: () => void;
}

const Landing: React.FC<LandingProps> = ({ hasVault, onContinue }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="text-emerald-400" size={28} />
          <span className="font-black tracking-tighter text-white text-xl uppercase">Family Locker</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <WifiOff size={14} className="text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Offline-First Technology</span>
          </div>
          <button 
            onClick={onContinue}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/10"
          >
            {hasVault ? 'Unlock Vault' : 'Get Started'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-center space-y-8">
        <div className="inline-flex p-3 bg-emerald-500/5 text-emerald-400 rounded-2xl border border-emerald-500/10 mb-4 animate-in fade-in zoom-in duration-700">
          <ShieldCheck size={32} />
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700">
          The Last Map For <br/> <span className="text-emerald-400">The People You Love.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          When a tragedy happens, the burden of logistics shouldn't compound the pain of grief. 
          Family Locker is your encrypted, private, and local-first repository for everything your survivors will need.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <button 
            onClick={onContinue}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20"
          >
            {hasVault ? 'Access My Locker' : 'Initialize Your Local Vault'}
            <ArrowRight size={20} />
          </button>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
            <Lock size={12} /> No Cloud. No Servers. Just You.
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-900 grid md:grid-cols-3 gap-12">
        <Feature 
          icon={<Heart className="text-rose-500" />}
          title="Prevent Logistical Trauma"
          description="Remove the guesswork of locked accounts, utility payments, and estate documents so your family can focus on mourning, not chores."
        />
        <Feature 
          icon={<Lock className="text-emerald-400" />}
          title="Zero-Knowledge Privacy"
          description="Everything is encrypted in your browser using AES-256. We never see your data, your password, or your recovery key. Ever."
        />
        <Feature 
          icon={<HardDrive className="text-blue-500" />}
          title="USB & Offline Portability"
          description="Export your plan to a secure JSON file or save the entire app to a USB drive for physical safe-keeping in a fire-box or safe."
        />
      </section>

      {/* Importance Section */}
      <section className="bg-slate-900/50 py-24 border-y border-slate-900">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white tracking-tight">Why this isn't in the Cloud.</h2>
            <p className="text-slate-400 leading-relaxed">
              Standard legacy tools store your data on their servers. This creates a single point of failure and a target for hackers. 
            </p>
            <p className="text-slate-400 leading-relaxed">
              <strong>Family Locker</strong> is a client-side application. It runs locally on your device. Your data is encrypted with a master passphrase that stays in your head, and a physical recovery key that stays in your safe.
            </p>
            <div className="pt-4 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm font-medium text-emerald-400">
                <ShieldCheck size={18} /> Military-Grade AES-256 Encryption
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-emerald-400">
                <ShieldCheck size={18} /> PBKDF2 Key Derivation (100k Iterations)
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-emerald-400">
                <ShieldCheck size={18} /> No Third-Party Tracking or Cookies
              </div>
            </div>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
            <div className="flex items-center gap-3 text-amber-500">
              <AlertCircle size={24} />
              <h3 className="font-bold text-lg">The Portability Advantage</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Because this app is a single lightweight file, you can:
            </p>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center shrink-0 text-amber-500 border border-slate-800">1</div>
                <div>
                  <h4 className="text-white font-bold text-sm">Save to USB</h4>
                  <p className="text-xs text-slate-500">Put a copy of this app on a dedicated USB drive for your executor.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center shrink-0 text-amber-500 border border-slate-800">2</div>
                <div>
                  <h4 className="text-white font-bold text-sm">Print Your Rescue Kit</h4>
                  <p className="text-xs text-slate-500">Generate a physical paper backup with your Recovery Key for a home safe.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center shrink-0 text-amber-500 border border-slate-800">3</div>
                <div>
                  <h4 className="text-white font-bold text-sm">Offline Access</h4>
                  <p className="text-xs text-slate-500">Your survivors can use it even if the internet is down or the provider vanishes.</p>
                </div>
              </li>
            </ul>
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
          </div>
        </div>
      </section>

      {/* Quote / Philosophy */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center italic space-y-6">
        <p className="text-2xl text-slate-200 font-medium leading-relaxed">
          "The greatest gift you can give your survivors is clarity. By handling the logistics now, you give them the space they need to mourn without the trauma of uncertainty."
        </p>
        <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full" />
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <div className="bg-emerald-500 p-12 rounded-[3rem] space-y-6 shadow-2xl shadow-emerald-500/20">
          <h2 className="text-3xl md:text-4xl font-black text-slate-950">Start Your Legacy Plan Today.</h2>
          <p className="text-emerald-950 font-medium text-lg max-w-lg mx-auto">
            Setup takes less than 5 minutes. Your future self (and your family) will thank you.
          </p>
          <button 
            onClick={onContinue}
            className="bg-slate-950 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-xl"
          >
            {hasVault ? 'Enter Your Vault' : 'Initialize Locker'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 opacity-50">
          <ShieldAlert className="text-emerald-400" size={16} />
          <span className="font-bold tracking-tighter text-white text-xs uppercase">Family Locker</span>
        </div>
        <p className="text-[10px] text-slate-600 uppercase font-bold tracking-widest text-center">
          Private . Secure . Local . Permanent
        </p>
        <div className="text-[10px] text-slate-500 flex gap-4 uppercase font-bold tracking-widest">
          <span>v2.0 Stable</span>
          <span>Open Source Architecture</span>
        </div>
      </footer>
    </div>
  );
};

const Feature: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="space-y-4 p-4 hover:bg-slate-900/50 rounded-2xl transition-colors">
    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 mb-2 shadow-inner">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">
      {description}
    </p>
  </div>
);

export default Landing;
