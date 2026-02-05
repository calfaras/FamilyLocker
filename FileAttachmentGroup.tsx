
import React, { useState } from 'react';
import { AttachedFile } from './types';
import { Upload, File, Download, Trash2, AlertCircle } from 'lucide-react';

const MAX_FILE_SIZE_BYTES = 1024 * 1024; // 1MB

interface FileAttachmentGroupProps {
  files: AttachedFile[];
  onFilesUpdate: (newFiles: AttachedFile[]) => void;
  categoryLabel: string; // e.g., "for Estate Plan"
}

const FileAttachmentGroup: React.FC<FileAttachmentGroupProps> = ({ files, onFilesUpdate, categoryLabel }) => {
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError(`File too large. Max size is ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB.`);
      e.target.value = ''; // Clear file input
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        const base64Data = event.target.result;
        const newAttachment: AttachedFile = {
          id: Date.now().toString(),
          name: file.name,
          mimeType: file.type,
          base64Data: base64Data,
          size: file.size,
        };
        onFilesUpdate([...files, newAttachment]);
      }
    };
    reader.onerror = () => {
      setFileError('Failed to read file.');
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // Clear file input after reading
  };

  const handleFileRemove = (id: string) => {
    onFilesUpdate(files.filter(f => f.id !== id));
  };

  const handleFileDownload = (file: AttachedFile) => {
    const link = document.createElement('a');
    link.href = file.base64Data;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Attach small digital files {categoryLabel} (max {MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB per file).
      </p>

      {fileError && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg flex items-center gap-2 text-sm">
          <AlertCircle size={18} /> {fileError}
        </div>
      )}

      <label className="flex items-center justify-center w-full p-3 border-2 border-dashed border-blue-200 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
        <div className="flex items-center gap-2 text-blue-600">
          <Upload size={18} />
          <span className="font-medium text-sm">Upload File</span>
        </div>
        <input type="file" className="hidden" onChange={handleFileAttach} />
      </label>

      {files.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-100 mt-4">
          {files.map(file => (
            <div key={file.id} className="flex items-center justify-between bg-white p-2 rounded-md border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2">
                <File size={18} className="text-slate-400" />
                <div>
                  <span className="block text-xs font-medium text-slate-800">{file.name}</span>
                  <span className="block text-[10px] text-slate-500">{formatFileSize(file.size)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleFileDownload(file)}
                  className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                  title="Download File"
                >
                  <Download size={16} />
                </button>
                <button
                  onClick={() => handleFileRemove(file.id)}
                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                  title="Remove File"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileAttachmentGroup;
