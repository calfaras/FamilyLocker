
import React, { useEffect } from 'react';
import { LegacyData } from '../types';
import { useLocation, useNavigate, Link, Routes, Route, NavigateFunction, Navigate } from 'react-router-dom';
import { DollarSign, FileText, Users, Building2 } from 'lucide-react';

// Individual views to be tabbed
import Documents from './Documents';
import Finances from './Finances';
import ProfessionalTeam from './ProfessionalTeam';

const GroupedProfessionalAndFinancial: React.FC<{ data: LegacyData, updateData: (fn: (p: LegacyData) => LegacyData) => void }> = ({ data, updateData }) => {
  const location = useLocation();
  const navigate: NavigateFunction = useNavigate();

  // Redirect to a default tab if no sub-route is specified
  useEffect(() => {
    if (location.pathname === '/pro-fin') {
      navigate('/pro-fin/finances', { replace: true });
    }
  }, [location.pathname, navigate]);

  const tabs = [
    { path: 'finances', label: 'Finances', icon: <Building2 size={18} /> },
    { path: 'docs', label: 'Critical Docs', icon: <FileText size={18} /> },
    { path: 'team', label: 'Professional Team', icon: <Users size={18} /> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
          <DollarSign size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Financial & Professional Information</h2>
          <p className="text-slate-500">Your core financial structure, critical documents, and support network.</p>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="flex space-x-2 border-b border-slate-200 pb-2 -mt-4">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={`/pro-fin/${tab.path}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              location.pathname.startsWith(`/pro-fin/${tab.path}`)
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </Link>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="pt-4">
        <Routes>
          <Route path="finances" element={<Finances data={data} updateData={updateData} />} />
          <Route path="docs" element={<Documents data={data} updateData={updateData} />} />
          <Route path="team" element={<ProfessionalTeam data={data} updateData={updateData} />} />
          {/* Default route to redirect to finances if /pro-fin is accessed directly */}
          <Route path="/" element={<Navigate to="finances" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default GroupedProfessionalAndFinancial;
