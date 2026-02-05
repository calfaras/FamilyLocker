
import React from 'react';
import { LegacyData } from '../types';
import { ShieldAlert, Printer, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FullPlanPrint: React.FC<{ data: LegacyData }> = ({ data }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 print:space-y-0">
      {/* Header UI - Hidden on Print */}
      <div className="print:hidden flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Print Preview</h2>
            <p className="text-slate-500">Review your full legacy document before printing.</p>
          </div>
        </div>
        <button 
          onClick={handlePrint}
          className="bg-amber-500 text-slate-950 px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-amber-400 transition-all shadow-lg"
        >
          <Printer size={20} /> Generate PDF / Print
        </button>
      </div>

      {/* Main Print Container */}
      <div className="bg-white print:bg-white min-h-screen p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm print:border-none print:p-0">
        
        {/* Cover Page */}
        <section className="text-center space-y-8 py-20 border-b-4 border-double border-slate-200 page-break-after-always">
          <div className="flex justify-center">
            <ShieldAlert size={80} className="text-slate-900" />
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Family Locker</h1>
          <p className="text-2xl text-slate-500 font-medium">A Comprehensive Household & Financial Legacy Plan</p>
          <div className="pt-20">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Document Generated On</p>
            <p className="text-xl font-bold text-slate-800">{new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}</p>
          </div>
          <div className="pt-20 bg-slate-50 p-8 rounded-2xl border border-slate-100 max-w-xl mx-auto">
            <h4 className="font-bold text-slate-900 mb-2">Notice to Executor / Survivor</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              This document contains sensitive personal, financial, and logistical information. Keep it in a physically secure location. This plan is intended to guide you through the transition and provides context for the creator's final wishes and household operations.
            </p>
          </div>
        </section>

        {/* 0. Creator Contact Information */}
        <PrintSection title="0. Creator Contact Information">
          <div className="grid grid-cols-2 gap-8">
            <PrintField label="Legal Name" value={data.creatorDetails.legalName} />
            <PrintField label="Address" value={data.creatorDetails.address} />
            <PrintField label="State" value={data.creatorDetails.state} />
            <PrintField label="Zip Code" value={data.creatorDetails.zipCode} />
          </div>
        </PrintSection>
        
        {/* 0.5. Local Professional Services (Conditional) */}
        {data.wantsLocalServicesInfo && data.localServicesNotes && (
          <PrintSection title="0.5. Local Professional Services">
            <PrintField 
              label="Manually Recorded Notes" 
              value={data.localServicesNotes} 
              pre 
              disclaimer="This section is for user-provided, manually entered details only. This application does not automatically search for or recommend services due to its client-side, encrypted nature." 
            />
          </PrintSection>
        )}

        {/* 1. Personal Notes */}
        <PrintSection title="1. Personal Notes">
          <PrintField label="Letter to Spouse / Partner" value={data.personalNotes.partnerLetter} pre />
          <PrintField label="Letter to Children" value={data.personalNotes.childrenLetter} pre />
          <PrintField label="Intentions & Spirit of this Document" value={data.personalNotes.intentions} pre />
        </PrintSection>

        {/* 2. Immediate First Steps */}
        <PrintSection title="2. Immediate First Steps">
          <div className="space-y-4">
            {data.firstSteps.map((step, idx) => (
              <div key={step.id} className="flex gap-4 items-start pb-4 border-b border-slate-50 last:border-0">
                <span className="font-mono font-bold text-slate-300">{idx + 1}.</span>
                <span className="text-slate-800 font-medium">{step.text}</span>
              </div>
            ))}
          </div>
        </PrintSection>

        {/* 3. Access & Password Management */}
        <PrintSection title="3. Access & Password Management">
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase mb-4 tracking-widest">Master Vault Access</h4>
              <div className="grid grid-cols-2 gap-8">
                <PrintField label="Password Manager" value={data.passwords.manager} />
                <PrintField label="Primary Username/Email" value={data.passwords.username} />
                <PrintField label="Master Password" value={data.passwords.masterPassword} secret />
              </div>
            </div>

            {data.manualAccounts && data.manualAccounts.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase mb-4 tracking-widest">Individual Accounts</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="pb-2 font-bold text-slate-500 uppercase text-[10px]">Service</th>
                        <th className="pb-2 font-bold text-slate-500 uppercase text-[10px]">Username</th>
                        <th className="pb-2 font-bold text-slate-500 uppercase text-[10px]">Password</th>
                        <th className="pb-2 font-bold text-slate-500 uppercase text-[10px]">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.manualAccounts.map(acc => (
                        <tr key={acc.id} className="border-b border-slate-50">
                          <td className="py-3 font-bold text-slate-800">{acc.service}</td>
                          <td className="py-3 text-slate-600">{acc.username}</td>
                          <td className="py-3 font-mono text-slate-800">{acc.password}</td>
                          <td className="py-3 text-slate-500 italic">{acc.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </PrintSection>

        {/* 4. Critical Documents */}
        <PrintSection title="4. Critical Document Locations">
          <div className="grid grid-cols-2 gap-8">
            <PrintField label="Estate Plan (Wills, Trusts)" value={data.criticalDocs.estatePlanSummary} />
            <PrintField label="Digital Backups Location" value={data.criticalDocs.digitalCopiesLocation} />
            <PrintField label="Health Directives / Living Will" value={data.criticalDocs.healthDirectivesLocation} />
            <PrintField label="ID Locations (Passport, SSN)" value={data.criticalDocs.idLocations} />
          </div>
        </PrintSection>

        {/* 5. Financial Ecosystem */}
        <PrintSection title="5. Financial Ecosystem">
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <PrintField label="Banking Institutions" value={data.finances.banks} />
              <PrintField label="Brokerage / Retirement" value={data.finances.brokerage} />
              <PrintField label="Credit Cards" value={data.finances.creditCards} />
              <PrintField label="529 Plans" value={data.finances.fiveTwoNine} />
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-4 border-b pb-2">Life Insurance</h4>
              <div className="grid grid-cols-3 gap-4">
                <PrintField label="Company" value={data.finances.lifeInsurance.company} />
                <PrintField label="Benefit Amount" value={data.finances.lifeInsurance.benefit} />
                <PrintField label="Premiums" value={data.finances.lifeInsurance.premiums} />
              </div>
              <div className="mt-4">
                <PrintField label="Redemption Instructions" value={data.finances.lifeInsurance.instructions} />
              </div>
            </div>
          </div>
        </PrintSection>

        {/* 6. Professional Support Team */}
        <PrintSection title="6. Professional Support Team">
          <div className="grid grid-cols-2 gap-4">
            {data.professionalTeam.map(member => (
              <div key={member.id} className="p-4 border border-slate-200 rounded-lg">
                <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">{member.role}</p>
                <p className="font-bold text-slate-900">{member.name}</p>
                <p className="text-sm text-slate-500">{member.phone}</p>
                <p className="text-sm text-slate-500">{member.email}</p>
              </div>
            ))}
          </div>
        </PrintSection>

        {/* 7. Digital Life */}
        <PrintSection title="7. Digital Life">
          <div className="grid grid-cols-2 gap-8">
            <PrintField label="Phone Carrier" value={data.digitalItems.phoneCarrier} />
            <PrintField label="Phone PIN / Passcode" value={data.digitalItems.phonePin} secret />
            <PrintField label="Social Media Instructions" value={data.digitalItems.socialMediaInstructions} pre />
            <PrintField label="Cloud Storage Services" value={data.digitalItems.cloudStorage} pre />
            <PrintField label="Domains & Websites Login Info" value={data.digitalItems.domainLogins} pre />
          </div>
        </PrintSection>

        {/* 8. Pet Care & Needs */}
        <PrintSection title="8. Pet Care & Needs">
          <div className="grid grid-cols-2 gap-8">
            <PrintField label="Veterinary Provider" value={data.petCare.provider} />
            <PrintField label="Food & Schedule" value={data.petCare.food} />
            <PrintField label="Medications" value={data.petCare.medications} />
            <PrintField label="Dog Sitter / Walker" value={data.petCare.dogsitter} />
          </div>
        </PrintSection>

        {/* 9. Household Operations */}
        <PrintSection title="9. Household Operations">
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <PrintField label="Mortgage / Lender" value={data.household.mortgage.company} />
              <PrintField label="Home Security Safe Word" value={data.household.security.safeWord} />
              <PrintField label="Alarm Code" value={data.household.security.alarmCode} secret />
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">Utilities</h4>
              <div className="grid grid-cols-3 gap-4">
                {data.household.utilities.map(u => (
                  <div key={u.id} className="text-sm">
                    <p className="font-bold text-slate-700">{u.type}</p>
                    <p className="text-slate-500">{u.provider}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PrintSection>

        {/* Security Footer */}
        <footer className="mt-20 pt-8 border-t border-slate-200 text-center">
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
            PRIVATE AND CONFIDENTIAL DOCUMENT. STORE SECURELY.
          </p>
        </footer>

      </div>
    </div>
  );
};

const PrintSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <section className="py-10 border-b border-slate-100 last:border-0 page-break-inside-avoid">
    <h3 className="text-xl font-black text-slate-900 mb-8 pb-2 border-b-2 border-slate-900 uppercase tracking-tight">{title}</h3>
    {children}
  </section>
);

const PrintField: React.FC<{ label: string, value: string, pre?: boolean, secret?: boolean, disclaimer?: string }> = ({ label, value, pre, secret, disclaimer }) => (
  <div className="space-y-1 mb-4">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
    {value ? (
      <div className={`${pre ? 'whitespace-pre-wrap leading-relaxed' : ''} ${secret ? 'font-mono bg-slate-50 p-2 rounded border border-slate-200' : 'text-slate-800'}`}>
        {value}
      </div>
    ) : (
      <div className="text-slate-300 italic text-sm">No information provided</div>
    )}
    {disclaimer && <p className="text-[10px] italic text-slate-500 mt-2">⚠️ {disclaimer}</p>}
  </div>
);

export default FullPlanPrint;
