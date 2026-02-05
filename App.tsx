

import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
// Fix: Added missing 'ArrowLeft' icon to the lucide-react imports.
import { 
  Heart, CheckSquare, Key, FileText, DollarSign, Smartphone, Users, 
  PawPrint, Home, Download, Upload, ShieldAlert, Settings, Menu, 
  X, Lock, Unlock, WifiOff, ShieldCheck, Printer, LifeBuoy, BookOpen, Briefcase, Table, AlertTriangle, RefreshCcw, Eye, EyeOff, Check, Copy, ArrowLeft
} from 'lucide-react';
import { LegacyData } from './types';
import { INITIAL_DATA } from './constants';
import { encryptVault, decryptVault, generateRecoveryKey, EncryptedVault } from './cryptoUtils';
import { generateTabularCsv, downloadCsv, uploadCsv, parseTabularCsv } from './csvUtils';


// --- Views ---
import Landing from './views/Landing';
import Overview from './views/Overview';
import PersonalNotes from './views/PersonalNotes';
import FirstSteps from './views/FirstSteps';
import Passwords from './views/Passwords';
import RescueKit from './views/RescueKit';
import ResourceManual from './views/ResourceManual';
import FullPlanPrint from './views/FullPlanPrint';
import Services from './views/Services'; 

// Grouped Views
import GroupedProfessionalAndFinancial from './views/GroupedProfessionalAndFinancial';
import GroupedDigitalHouseholdPet from './views/GroupedDigitalHouseholdPet';


const App: React.FC = () => {
  const [data, setData] = useState<LegacyData | null>(null);
  const [passphrase, setPassphrase] = useState<string>('');
  const [confirmPassphrase, setConfirmPassphrase] = useState<string>('');
  const [recoveryKey, setRecoveryKey] = useState<string>('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLocked, setIsLocked] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [csvError, setCsvError] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [copied, setCopied] = useState(false);

  // Setup Specific State
  const [setupStep, setSetupStep] = useState(1); // 1: Password, 2: Key Presentation

  useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  const hasVault = !!localStorage.getItem('incase_vault');

  const handleCopyKey = () => {
    navigator.clipboard.writeText(recoveryKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInitializeVault = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passphrase !== confirmPassphrase) {
      setError("Passphrases do not match.");
      return;
    }
    if (passphrase.length < 8) {
      setError("Passphrase must be at least 8 characters.");
      return;
    }

    const newRecoveryKey = generateRecoveryKey();
    setRecoveryKey(newRecoveryKey);
    setSetupStep(2); // Move to key presentation
  };

  const handleCompleteSetup = async () => {
    const encryptedVault = await encryptVault(JSON.stringify(INITIAL_DATA), passphrase, recoveryKey);
    localStorage.setItem('incase_vault', JSON.stringify(encryptedVault));
    localStorage.setItem('incase_recovery_key', recoveryKey);
    setData(INITIAL_DATA);
    setIsLocked(false);
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const encryptedVaultStr = localStorage.getItem('incase_vault');
    const storedRecoveryKey = localStorage.getItem('incase_recovery_key');
    
    if (!encryptedVaultStr) return;

    try {
      const vault: EncryptedVault = JSON.parse(encryptedVaultStr);
      const secret = passphrase;
      const decrypted = await decryptVault(vault, secret);
      
      if (isRecoveryMode) {
        setRecoveryKey(secret); 
      } else if (storedRecoveryKey) {
        setRecoveryKey(storedRecoveryKey);
      }

      setData(JSON.parse(decrypted));
      setIsLocked(false);
    } catch (err) {
      setError(`Invalid ${isRecoveryMode ? 'Recovery Key' : 'Passphrase'}. Please try again.`);
    }
  };

  const handleSave = async () => {
    if (!data || !passphrase) return;
    const currentRecoveryKey = recoveryKey || localStorage.getItem('incase_recovery_key') || '';
    const encryptedVault = await encryptVault(JSON.stringify(data), passphrase, currentRecoveryKey);
    localStorage.setItem('incase_vault', JSON.stringify(encryptedVault));
    if (currentRecoveryKey) {
      localStorage.setItem('incase_recovery_key', currentRecoveryKey);
    }
  };

  useEffect(() => {
    if (!isLocked && data && passphrase) {
      handleSave();
    }
  }, [data, isLocked, passphrase]);

  const updateData = useCallback((updater: (prev: LegacyData) => LegacyData) => {
    setData(prev => prev ? updater(prev) : null);
  }, []);

  const handleExport = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Family-Locker-Plan-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        setData(imported);
        alert('Data imported. Ensure your current master passphrase is what you want to use.');
      } catch (err) {
        alert('Invalid data file.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; 
  };

  const handleResetVault = () => {
    if (window.confirm("WARNING: This will permanently delete your local vault and all its contents. Make sure you have an export/backup if you want to keep your data. Reset anyway?")) {
      localStorage.removeItem('incase_vault');
      localStorage.removeItem('incase_recovery_key');
      window.location.reload();
    }
  };

  const handleExportTabularData = () => {
    if (!data) return;
    const csvContent = generateTabularCsv(data);
    downloadCsv(`Family-Locker-Tabular-${new Date().toISOString().split('T')[0]}.csv`, csvContent);
  };

  const handleImportTabularData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCsvError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    uploadCsv(
      file,
      (parsedData: Partial<LegacyData>) => {
        updateData(prev => {
          if (!prev) return prev;
          const newHousehold = { ...prev.household };
          if (parsedData.household?.utilities) newHousehold.utilities = parsedData.household.utilities;
          if (parsedData.household?.maintenance) newHousehold.maintenance = parsedData.household.maintenance;
          return { ...prev, ...parsedData, household: newHousehold };
        });
        alert('Tabular data imported successfully!');
      },
      (error: string) => setCsvError(error)
    );
    e.target.value = ''; 
  };


  if (isLocked) {
    if (showLanding) {
      return <Landing hasVault={hasVault} onContinue={() => setShowLanding(false)} />;
    }

    if (!hasVault) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setShowLanding(true)}
              className="text-xs text-slate-500 hover:text-white transition-colors uppercase font-bold tracking-widest flex items-center gap-1 mb-2"
            >
              <ArrowLeft size={12} /> Back
            </button>
            <div className="text-center">
              <div className="inline-flex p-4 bg-emerald-500/10 text-emerald-400 rounded-full mb-4">
                <ShieldCheck size={48} />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Create New Vault</h1>
              <p className="text-slate-400 text-sm">Initialize your local, zero-knowledge encrypted instance.</p>
            </div>

            {setupStep === 1 ? (
              <form onSubmit={handleInitializeVault} className="space-y-4">
                <div className="space-y-4">
                  <div className="relative">
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Master Passphrase</label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        autoFocus
                        value={passphrase}
                        onChange={(e) => setPassphrase(e.target.value)}
                        placeholder="Choose a strong passphrase..."
                        className="w-full bg-slate-800 border-none rounded-2xl p-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-emerald-500 transition-all text-center text-lg font-mono"
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                        {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-2 px-2">
                       <div className={`h-1.5 flex-1 rounded-full transition-colors ${passphrase.length >= 8 ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                       <div className={`h-1.5 flex-1 rounded-full transition-colors ${passphrase.length >= 12 ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                       <div className={`h-1.5 flex-1 rounded-full transition-colors ${passphrase.length >= 16 ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                    </div>
                    <p className={`text-[10px] mt-1 text-center font-bold uppercase tracking-wider ${passphrase.length >= 8 ? 'text-emerald-500' : 'text-slate-500'}`}>
                      {passphrase.length < 8 ? '⚠️ Requirement: 8+ characters' : 'Length Requirement Met'}
                    </p>
                  </div>

                  <div className="relative">
                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Verify Passphrase</label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        value={confirmPassphrase}
                        onChange={(e) => setConfirmPassphrase(e.target.value)}
                        placeholder="Re-type your passphrase..."
                        className="w-full bg-slate-800 border-none rounded-2xl p-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-emerald-500 transition-all text-center text-lg font-mono"
                      />
                      {confirmPassphrase && confirmPassphrase === passphrase && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500">
                          <Check size={20} />
                        </div>
                      )}
                    </div>
                    {confirmPassphrase && confirmPassphrase !== passphrase && (
                      <p className="text-[10px] text-red-400 text-center font-bold uppercase mt-1">Passphrases do not match</p>
                    )}
                  </div>
                </div>

                {error && <p className="text-red-400 text-xs font-medium text-center">{error}</p>}

                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 text-[11px] text-slate-400 leading-relaxed">
                  <p className="flex gap-2">
                    <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                    <span>Your passphrase is the "Master Key" used to derive your encryption keys. We cannot reset it.</span>
                  </p>
                </div>

                <button 
                  type="submit"
                  disabled={!passphrase || passphrase !== confirmPassphrase || passphrase.length < 8}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <Unlock size={20} />
                  Initialize Vault
                </button>
              </form>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl">
                  <h3 className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-2">
                    <AlertTriangle size={16} /> Important: Your Recovery Key
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    This key is the ONLY way to recover your data if you forget your passphrase.
                  </p>
                  <div 
                    onClick={handleCopyKey}
                    className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center select-all cursor-pointer group active:scale-95 transition-transform"
                  >
                    <span className="text-xl font-mono font-black text-amber-400 tracking-wider">
                      {recoveryKey}
                    </span>
                    <p className="text-[10px] text-slate-600 mt-2 uppercase font-bold flex items-center justify-center gap-1 group-hover:text-amber-500">
                      {copied ? <><Check size={10} /> Copied to Clipboard</> : <><Copy size={10} /> Click to Copy Key</>}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] text-slate-500 text-center uppercase font-bold tracking-widest">Write this down and keep it safe.</p>
                  <button 
                    onClick={handleCompleteSetup}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-2xl transition-all shadow-lg"
                  >
                    I Have Saved My Key - Enter Vault
                  </button>
                </div>
              </div>
            )}
            
            <p className="text-[10px] text-slate-600 leading-relaxed uppercase tracking-widest font-bold text-center">
              Privacy First. Zero-Knowledge. <br/> Local Storage Only.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in duration-300">
          <button 
            onClick={() => setShowLanding(true)}
            className="text-xs text-slate-500 hover:text-white transition-colors uppercase font-bold tracking-widest flex items-center gap-1 mb-2"
          >
            <ArrowLeft size={12} /> Home
          </button>
          <div className="inline-flex p-4 bg-amber-500/10 text-amber-400 rounded-full mb-2">
            <Lock size={48} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {isRecoveryMode ? 'Recovery Access' : 'Locker Locked'}
            </h1>
            <p className="text-slate-400 text-sm">
              {isRecoveryMode 
                ? 'Enter your 20-character Recovery Key to bypass the master passphrase.' 
                : 'Enter your master passphrase to decrypt your legacy plan.'}
            </p>
          </div>
          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="relative">
              <input
                type={isRecoveryMode ? "text" : (showPass ? "text" : "password")}
                autoFocus
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder={isRecoveryMode ? "XXXXX-XXXXX-XXXXX-XXXXX" : "Enter Passphrase..."}
                className="w-full bg-slate-800 border-none rounded-2xl p-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-amber-500 transition-all text-center text-lg font-mono"
              />
               {!isRecoveryMode && (
                 <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                   {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                 </button>
               )}
            </div>
            {error && <p className="text-red-400 text-xs font-medium">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 rounded-2xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <Unlock size={20} />
              {isRecoveryMode ? 'Verify Recovery Key' : 'Unlock Vault'}
            </button>
            <button 
              type="button"
              onClick={() => { setIsRecoveryMode(!isRecoveryMode); setPassphrase(''); setError(null); }}
              className="text-xs text-slate-500 hover:text-amber-400 underline underline-offset-4"
            >
              {isRecoveryMode ? 'Back to Passphrase' : 'Forgot Passphrase? Use Recovery Key'}
            </button>
          </form>
          <div className="pt-6 border-t border-slate-800">
            <button 
              onClick={handleResetVault}
              className="text-[10px] text-slate-700 hover:text-red-900 transition-colors uppercase font-bold tracking-widest flex items-center gap-1 mx-auto"
            >
              <RefreshCcw size={10} /> Wipe Storage & Reset App
            </button>
          </div>
        </div>
      </div>
    );
  }

  const baseNavItems = [
    { id: 'overview', icon: <Settings size={20} />, label: 'Overview', path: '/' },
    { id: 'rescue', icon: <LifeBuoy size={20} />, label: 'Rescue Kit', path: '/rescue' },
    { id: 'personal', icon: <Heart size={20} />, label: 'Personal Notes', path: '/personal' },
    { id: 'first-steps', icon: <CheckSquare size={20} />, label: 'First Steps', path: '/first-steps' },
    { id: 'passwords', icon: <Key size={20} />, label: 'Passwords', path: '/passwords' },
    { id: 'pro-fin', icon: <DollarSign size={20} />, label: 'Financial & Pro Team', path: '/pro-fin/finances' },
    { id: 'digital-home-pets', icon: <Home size={20} />, label: 'Digital, Home & Pets', path: '/digital-home-pets/digital' },
    { id: 'manual', icon: <BookOpen size={20} />, label: 'Resource Manual', path: '/manual' },
  ];

  let navItems = [...baseNavItems];
  if (data?.wantsLocalServicesInfo) {
    navItems.splice(7, 0, { id: 'services', icon: <Briefcase size={20} />, label: 'Services', path: '/services' });
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50 font-sans print:bg-white">
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 text-white flex items-center justify-between px-4 z-[60] print:hidden">
          <div className="flex items-center gap-2">
            <ShieldAlert className="text-emerald-400" />
            <span className="font-bold text-sm uppercase">Family Locker</span>
          </div>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2">
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </div>

        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 shadow-2xl flex flex-col print:hidden`}>
          <div className="p-6 border-b border-slate-800 hidden lg:block">
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2 uppercase">
              <ShieldAlert className="text-emerald-400" />
              <span>Family Locker</span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
               {!isOnline ? (
                 <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                   <WifiOff size={10} /> Offline Mode
                 </div>
               ) : (
                 <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                   <ShieldCheck size={10} /> Secure Session
                 </div>
               )}
            </div>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto no-scrollbar">
            {navItems.map((item) => (
              <NavLink key={item.id} to={item.path} icon={item.icon} label={item.label} onClick={() => setSidebarOpen(false)} />
            ))}
          </nav>

          <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-2">
              <Link 
                to="/print" 
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-emerald-400 hover:bg-emerald-400/10 rounded transition-colors font-bold"
              >
                <Printer size={16} /> Print Full Plan
              </Link>
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded transition-colors"
              >
                <Download size={16} /> Export Backup (JSON)
              </button>
              <label className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded transition-colors cursor-pointer">
                <Upload size={16} /> Import File (JSON)
                <input type="file" className="hidden" onChange={handleImport} accept=".json" />
              </label>
              
              <button 
                onClick={handleExportTabularData}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-blue-300 hover:bg-blue-500/10 rounded transition-colors"
              >
                <Table size={16} /> Export Tabular (CSV)
              </button>
              <label className="flex items-center gap-2 w-full px-3 py-2 text-sm text-blue-300 hover:bg-blue-500/10 rounded transition-colors cursor-pointer">
                <Upload size={16} /> Import Tabular (CSV)
                <input type="file" className="hidden" onChange={handleImportTabularData} accept=".csv" />
              </label>
              {csvError && (
                <div className="text-red-400 text-xs px-3 py-1 flex items-center gap-1">
                  <ShieldAlert size={12} /> {csvError}
                </div>
              )}

              <button 
                onClick={() => { setIsLocked(true); setShowLanding(true); setPassphrase(''); setConfirmPassphrase(''); setData(null); }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded transition-colors"
              >
                <Lock size={16} /> Lock Vault
              </button>
              <button 
                onClick={handleResetVault}
                className="flex items-center gap-2 w-full px-3 py-2 text-[10px] text-slate-600 hover:text-red-600 rounded transition-colors uppercase font-bold tracking-widest"
              >
                <RefreshCcw size={12} /> Wipe & Reset Locker
              </button>
          </div>
        </aside>

        <main className="flex-1 pt-16 lg:pt-0 overflow-y-auto print:pt-0">
          <div className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12 print:max-w-none print:p-0">
            <Routes>
              <Route path="/" element={<Overview data={data!} recoveryKey={recoveryKey} updateData={updateData} />} />
              <Route path="/manual" element={<ResourceManual />} />
              <Route path="/rescue" element={<RescueKit recoveryKey={recoveryKey} />} />
              <Route path="/personal" element={<PersonalNotes data={data!} updateData={updateData} />} />
              <Route path="/first-steps" element={<FirstSteps data={data!} updateData={updateData} />} />
              <Route path="/passwords" element={<Passwords data={data!} updateData={updateData} />} />
              <Route path="/pro-fin/*" element={<GroupedProfessionalAndFinancial data={data!} updateData={updateData} />} />
              <Route path="/digital-home-pets/*" element={<GroupedDigitalHouseholdPet data={data!} updateData={updateData} />} />
              <Route path="/print" element={<FullPlanPrint data={data!} />} />
              {data?.wantsLocalServicesInfo && <Route path="/services" element={<Services data={data!} updateData={updateData} />} />}
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

const NavLink: React.FC<{ to: string, icon: React.ReactNode, label: string, onClick: () => void }> = ({ to, icon, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to.endsWith('/*') && location.pathname.startsWith(to.slice(0, -1)));
  return (
    <Link to={to} onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? 'bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
      <span className={isActive ? 'text-slate-900' : 'text-slate-500'}>{icon}</span>
      {label}
    </Link>
  );
};

export default App;
