
import React, { useEffect } from 'react';
import { LegacyData } from '../types';
import { useLocation, useNavigate, Link, Routes, Route, NavigateFunction, Navigate } from 'react-router-dom';
import { Smartphone, Home, PawPrint } from 'lucide-react';

// Individual views to be tabbed
import DigitalItems from './DigitalItems';
import Household from './Household';
import PetCare from './PetCare';

const GroupedDigitalHouseholdPet: React.FC<{ data: LegacyData, updateData: (fn: (p: LegacyData) => LegacyData) => void }> = ({ data, updateData }) => {
  const location = useLocation();
  const navigate: NavigateFunction = useNavigate();

  // Redirect to a default tab if no sub-route is specified
  useEffect(() => {
    if (location.pathname === '/digital-home-pets') {
      navigate('/digital-home-pets/digital', { replace: true });
    }
  }, [location.pathname, navigate]);

  const tabs = [
    { path: 'digital', label: 'Digital Items', icon: <Smartphone size={18} /> },
    { path: 'household', label: 'Household', icon: <Home size={18} /> },
    { path: 'pets', label: 'Pet Care', icon: <PawPrint size={18} /> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
          <Home size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Digital, Household & Pet Information</h2>
          <p className="text-slate-500">Your online footprint, home operations, and pet care instructions.</p>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="flex space-x-2 border-b border-slate-200 pb-2 -mt-4">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={`/digital-home-pets/${tab.path}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              location.pathname.startsWith(`/digital-home-pets/${tab.path}`)
                ? 'bg-purple-500 text-white shadow-sm'
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
          <Route path="digital" element={<DigitalItems data={data} updateData={updateData} />} />
          <Route path="household" element={<Household data={data} updateData={updateData} />} />
          <Route path="pets" element={<PetCare data={data} updateData={updateData} />} />
          {/* Default route to redirect to digital if /digital-home-pets is accessed directly */}
          <Route path="/" element={<Navigate to="digital" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default GroupedDigitalHouseholdPet;
