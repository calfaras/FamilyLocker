
import React from 'react';
import { LegacyData } from '../types';
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';

const FirstSteps: React.FC<{ data: LegacyData, updateData: (fn: (p: LegacyData) => LegacyData) => void }> = ({ data, updateData }) => {
  const toggleStep = (id: string) => {
    updateData(prev => ({
      ...prev,
      firstSteps: prev.firstSteps.map(s => s.id === id ? { ...s, completed: !s.completed } : s)
    }));
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">First Steps to Take</h2>
        <p className="text-slate-500">When you are ready, follow these instructions to ensure stability and clarity.</p>
      </header>

      <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex gap-4">
        <AlertCircle className="text-amber-600 shrink-0" />
        <div className="text-sm text-amber-800 leading-relaxed">
          <strong>Immediate Priority:</strong> Notify your primary family advisor and your emergency contact. They have been briefed on the existence of this document and will guide you through the next 24-48 hours.
        </div>
      </div>

      <div className="space-y-3">
        {data.firstSteps.map((step, idx) => (
          <button
            key={step.id}
            onClick={() => toggleStep(step.id)}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all text-left ${
              step.completed 
                ? 'bg-slate-50 border-slate-200 opacity-60' 
                : 'bg-white border-slate-200 hover:border-amber-300 hover:shadow-md'
            }`}
          >
            <span className="text-slate-400 font-mono text-xs w-4">{idx + 1}.</span>
            {step.completed ? (
              <CheckCircle2 className="text-emerald-500 shrink-0" />
            ) : (
              <Circle className="text-slate-300 shrink-0" />
            )}
            <span className={`font-medium ${step.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
              {step.text}
            </span>
          </button>
        ))}
      </div>

      <div className="pt-6 border-t border-slate-200">
        <h3 className="font-bold text-slate-900 mb-4">Survivor Guide</h3>
        <p className="text-sm text-slate-600 leading-relaxed bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          If you are reading this and feeling overwhelmed, please know that the logistics are secondary to your well-being. This document is here to serve you, not to burden you. Work through one item at a time. The 'Professional Team' section has the contacts who can handle the heavy lifting of the estate and financial transitions.
        </p>
      </div>
    </div>
  );
};

export default FirstSteps;
