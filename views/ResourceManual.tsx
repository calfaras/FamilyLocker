
import React from 'react';
import { BookOpen, ShieldCheck, Heart, Key, DollarSign, Smartphone, Users, PawPrint, Home, CheckSquare, FileText, Briefcase } from 'lucide-react';

const ResourceManual: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-24 animate-in fade-in duration-700">
      <header className="text-center space-y-4">
        <div className="inline-flex p-4 bg-blue-100 text-blue-600 rounded-3xl">
          <BookOpen size={48} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">The Legacy Resource Manual</h1>
        <p className="text-xl text-slate-500 leading-relaxed">A guide for the creator and a map for the survivor.</p>
      </header>

      <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 border-b pb-4">1. Why This Matters</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            When someone passes away, the people left behind are forced to navigate a labyrinth of logistics while simultaneously processing profound grief. This dual burden is what we call <strong>"Logistical Trauma."</strong>
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mt-4">
            By completing this vault, you are performing one last, immense act of love. You are removing the guesswork, the stress of locked accounts, and the uncertainty of your final wishes. You are giving them space to mourn by handling the chores of the estate ahead of time.
          </p>
        </div>

        <div className="space-y-12 pt-8">
          <ManualSection 
            icon={<Heart className="text-red-500" />}
            title="Personal Notes: The Emotional Core"
            description="Wealth is more than numbers; it's values, memories, and intentions. This section ensures your voice is heard directly. Use it to provide context that a legal document cannot—the spirit of your decisions and your love for your family."
          />

          <ManualSection 
            icon={<CheckSquare className="text-amber-600" />}
            title="First Steps: Crisis Management"
            description="Decision fatigue is real. In the first 48 hours, survivors often don't know who to call first. This section acts as a 'break-glass-in-case-of-emergency' checklist to keep the ship steady while the fog clears."
          />

          <ManualSection 
            icon={<Key className="text-slate-700" />}
            title="Passwords: The Digital Gatekeeper"
            description="Our lives are behind digital walls. Access to email, utilities, and social media is critical for account memorialization and logistical continuity. Without this access, survivors may be locked out for months or years."
          />

          <ManualSection 
            icon={<FileText className="text-indigo-600" />}
            title="Critical Docs: The Legal Foundation"
            description="Knowing where the physical 'wet-signature' documents live is half the battle. This prevents unnecessary searches through boxes and attics and ensures identity documents are ready for legal processes."
          />

          <ManualSection 
            icon={<DollarSign className="text-emerald-600" />}
            title="Finances: Ensuring Continuity"
            description="Access to liquidity and understanding the insurance ecosystem is vital. This section ensures bills get paid, beneficiaries receive their support, and accounts don't disappear into unclaimed property."
          />

          <ManualSection 
            icon={<Smartphone className="text-pink-600" />}
            title="Digital Items: Your Virtual Legacy"
            description="From family photos in the cloud to social media accounts, our digital footprints are vast. This section helps survivors preserve your digital history and manage your online properties according to your wishes."
          />

          <ManualSection 
            icon={<Users className="text-blue-600" />}
            title="Professional Team: Expert Allies"
            description="You've built a team of experts. This section introduces your survivors to your attorney, CPA, and advisor—the people who will handle the complex heavy lifting so your family doesn't have to."
          />

          {/* New Section for Local Professional Services */}
          <ManualSection 
            icon={<Briefcase className="text-blue-500" />}
            title="Local Professional Services: Your Local Support Network"
            description="This dedicated section allows you to manually record details for local professional services like estate planning, financial advisors, tax professionals, and legal counsel. The app does not search for or provide these services; it offers a secure, private space for you to store contacts you have personally researched and vetted in your area."
          />

          <ManualSection 
            icon={<PawPrint className="text-orange-500" />}
            title="Pet Care: Vulnerable Family Members"
            description="Pets are family members who cannot speak for themselves. Ensuring their routine, medications, and preferred caretakers are documented prevents them from becoming victims of the transition."
          />

          <ManualSection 
            icon={<Home className="text-slate-800" />}
            title="Household: Operational Stability"
            description="The home is the sanctuary. Knowing the alarm codes, utility providers, and mortgage details ensures the household remains a stable refuge for your loved ones during the transition."
          />
        </div>
      </section>

      <section className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-2xl space-y-6">
        <div className="flex items-center gap-3 text-amber-400">
          <ShieldCheck size={28} />
          <h2 className="text-2xl font-bold">A Final Word for the Survivor</h2>
        </div>
        <p className="text-slate-300 leading-relaxed text-lg">
          If you are reading this as a survivor, please know: <strong>You do not have to do this all at once.</strong> 
        </p>
        <p className="text-slate-300 leading-relaxed text-lg mt-4">
          The person who created this vault did so because they wanted you to feel supported. Use the "Professional Team" section—those people are paid to help you. Lean on the "Personal Notes" for comfort. This document is a tool, not a burden. Take a breath. You are not alone in this.
        </p>
      </section>
    </div>
  );
};

const ManualSection: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="flex gap-6 items-start">
    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 shrink-0">
      {icon}
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default ResourceManual;