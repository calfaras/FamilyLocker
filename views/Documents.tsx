
import React from 'react';
import { LegacyData, AttachedFile } from '../types';
import { FileText, MapPin, Archive, HeartPulse } from 'lucide-react';
import FileAttachmentGroup from '../FileAttachmentGroup'; // Import the new component

const Documents: React.FC<{ data: LegacyData, updateData: (fn: (p: LegacyData) => LegacyData) => void }> = ({ data, updateData }) => {

  const handleChange = (field: keyof Omit<typeof data.criticalDocs, 'attachedEstatePlanFiles' | 'attachedDigitalCopiesFiles' | 'attachedHealthDirectivesFiles' | 'attachedIdFiles'>, value: string) => {
    updateData(prev => ({
      ...prev,
      criticalDocs: { ...prev.criticalDocs, [field]: value }
    }));
  };

  const handleFilesUpdate = (field: 'attachedEstatePlanFiles' | 'attachedDigitalCopiesFiles' | 'attachedHealthDirectivesFiles' | 'attachedIdFiles', newFiles: AttachedFile[]) => {
    updateData(prev => ({
      ...prev,
      criticalDocs: { ...prev.criticalDocs, [field]: newFiles }
    }));
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">Critical Documents</h2>
        <p className="text-slate-500">Physical locations and digital backups for legal essentials.</p>
      </header>

      <div className="grid gap-6">
        <DocSection
          icon={<FileText className="text-indigo-500" />}
          label="Estate Plan Summary"
          description="Who are the trustees? How do assets flow? Instructions for dependents."
          value={data.criticalDocs.estatePlanSummary}
          onChange={(v) => handleChange('estatePlanSummary', v)}
          attachedFiles={data.criticalDocs.attachedEstatePlanFiles}
          onFilesUpdate={(files) => handleFilesUpdate('attachedEstatePlanFiles', files)}
          fileCategoryLabel="for Estate Plan"
        />
        <DocSection
          icon={<Archive className="text-emerald-500" />}
          label="Digital Copies Location"
          description="Cloud storage links (Google Drive, Dropbox, etc.) or encrypted drive location for larger files."
          value={data.criticalDocs.digitalCopiesLocation}
          onChange={(v) => handleChange('digitalCopiesLocation', v)}
          attachedFiles={data.criticalDocs.attachedDigitalCopiesFiles}
          onFilesUpdate={(files) => handleFilesUpdate('attachedDigitalCopiesFiles', files)}
          fileCategoryLabel="for Digital Copies"
        />
        <DocSection
          icon={<HeartPulse className="text-rose-500" />}
          label="Health Directives / Living Will"
          description="Location of advance directives or medical power of attorney."
          value={data.criticalDocs.healthDirectivesLocation}
          onChange={(v) => handleChange('healthDirectivesLocation', v)}
          attachedFiles={data.criticalDocs.attachedHealthDirectivesFiles}
          onFilesUpdate={(files) => handleFilesUpdate('attachedHealthDirectivesFiles', files)}
          fileCategoryLabel="for Health Directives"
        />
        <DocSection
          icon={<MapPin className="text-amber-500" />}
          label="Identity Documents"
          description="Safe or file cabinet location for Social Security Card, Passport, Birth Certificate."
          value={data.criticalDocs.idLocations}
          onChange={(v) => handleChange('idLocations', v)}
          attachedFiles={data.criticalDocs.attachedIdFiles}
          onFilesUpdate={(files) => handleFilesUpdate('attachedIdFiles', files)}
          fileCategoryLabel="for Identity Documents"
        />
      </div>
    </div>
  );
};

const DocSection: React.FC<{
  icon: React.ReactNode,
  label: string,
  description: string,
  value: string,
  onChange: (v: string) => void,
  attachedFiles: AttachedFile[];
  onFilesUpdate: (newFiles: AttachedFile[]) => void;
  fileCategoryLabel: string;
}> = ({ icon, label, description, value, onChange, attachedFiles, onFilesUpdate, fileCategoryLabel }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="font-bold text-slate-800">{label}</h3>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[100px] p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm"
        placeholder="Enter locations or details..."
      />
    </div>
    <div className="pt-4 border-t border-slate-100">
      <FileAttachmentGroup
        files={attachedFiles}
        onFilesUpdate={onFilesUpdate}
        categoryLabel={fileCategoryLabel}
      />
    </div>
  </div>
);

export default Documents;
