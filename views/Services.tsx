
import React from 'react';
import { LegacyData } from '../types';
import { Briefcase, AlertCircle } from 'lucide-react';

const Services: React.FC<{ data: LegacyData, updateData: (fn: (p: LegacyData) => LegacyData) => void }> = ({ data, updateData }) => {
  const handleLocalServicesNotesChange = (value: string) => {
    updateData(prev => ({
      ...prev,
      localServicesNotes: value
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl">
          <Briefcase size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Your Manually Recorded Professional Services</h2>
          <p className="text-slate-500">Your researched contacts for essential professional support.</p>
        </div>
      </header>

      <section className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <textarea
            value={data.localServicesNotes}
            onChange={(e) => handleLocalServicesNotesChange(e.target.value)}
            placeholder="This section is for you to manually list details for local estate planners, financial advisors, tax professionals, or attorneys you've researched. Please include their Name, Address, Phone Number, Email, Website, and any relevant notes."
            className="w-full min-h-[250px] p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-y"
          />
          <div className="bg-blue-50 text-blue-800 p-4 rounded-lg flex items-start gap-4 text-sm font-medium">
            <AlertCircle size={20} className="text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Important Privacy Note:</strong> This application **cannot fetch or provide lists of services from the web.** Due to its client-side, encrypted nature, it does not connect to external services. This section is provided for you to **manually input** details of professionals you have independently identified and vetted, ensuring your privacy and security are always maintained.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;