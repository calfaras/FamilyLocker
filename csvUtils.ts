
import { LegacyData, ManualAccount, ProfessionalTeam, FirstStep, HouseholdUtility, HouseholdMaintenanceItem, Household } from './types';

// Helper to escape CSV values (handle commas, quotes, newlines)
function _escapeCsv(value: string | boolean | number | null | undefined): string {
  if (value === null || value === undefined) return '';
  let stringValue: string;
  if (typeof value === 'boolean') {
    stringValue = value ? 'TRUE' : 'FALSE';
  } else {
    stringValue = String(value);
  }

  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n') || stringValue.includes('\r')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

// Helper to unescape CSV values
function _unescapeCsv(value: string): string {
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.substring(1, value.length - 1).replace(/""/g, '"');
  }
  return value;
}

// Helper to format a single section for CSV export
function _formatSection<T>(
  sectionMarker: string,
  data: T[],
  headers: { key: keyof T; label: string }[]
): string {
  if (!data || data.length === 0) {
    return `${sectionMarker}\n${headers.map(h => _escapeCsv(h.label)).join(',')}`;
  }

  const csvRows = [];
  csvRows.push(sectionMarker); 
  csvRows.push(headers.map(h => _escapeCsv(h.label)).join(',')); 

  for (const item of data) {
    const row = headers.map(h => _escapeCsv(item[h.key] as any)).join(',');
    csvRows.push(row);
  }
  return csvRows.join('\n');
}

/**
 * Generates a multi-section CSV string containing specific tabular data from LegacyData.
 */
export function generateTabularCsv(data: LegacyData): string {
  const sections: string[] = [];

  sections.push(`# Family Locker: Tabular Data Export`);
  sections.push(`# This CSV contains structured data from your secure vault.`);
  sections.push(`# Each section begins with a header line (e.g., "MANUAL_ACCOUNTS_START") and ends before the next.`);
  sections.push(`# To import, ensure section headers and column headers are exactly as provided.`);
  sections.push(`# For boolean fields (e.g., 'Completed'), use 'TRUE' or 'FALSE'.`);
  sections.push(``); 

  // Manual Accounts
  sections.push(_formatSection<ManualAccount>(
    'MANUAL_ACCOUNTS_START',
    data.manualAccounts,
    [
      { key: 'service', label: 'Service' },
      { key: 'username', label: 'Username' },
      { key: 'password', label: 'Password' },
      { key: 'notes', label: 'Notes' },
    ]
  ));
  sections.push('');

  // Professional Team
  sections.push(_formatSection<ProfessionalTeam>(
    'PROFESSIONAL_TEAM_START',
    data.professionalTeam,
    [
      { key: 'role', label: 'Role' },
      { key: 'name', label: 'Name' },
      { key: 'phone', label: 'Phone' },
      { key: 'email', label: 'Email' },
    ]
  ));
  sections.push('');

  // First Steps
  sections.push(_formatSection<FirstStep>(
    'FIRST_STEPS_START',
    data.firstSteps,
    [
      { key: 'text', label: 'Text' },
      { key: 'completed', label: 'Completed' },
    ]
  ));
  sections.push('');

  // Household Utilities
  sections.push(_formatSection<HouseholdUtility>(
    'HOUSEHOLD_UTILITIES_START',
    data.household.utilities,
    [
      { key: 'type', label: 'Type' },
      { key: 'provider', label: 'Provider' },
      { key: 'cost', label: 'Cost' },
      { key: 'website', label: 'Website' },
    ]
  ));
  sections.push('');

  // Household Maintenance
  sections.push(_formatSection<HouseholdMaintenanceItem>(
    'HOUSEHOLD_MAINTENANCE_START',
    data.household.maintenance,
    [
      { key: 'type', label: 'Type' },
      { key: 'company', label: 'Company' },
      { key: 'contact', label: 'Contact' },
      { key: 'notes', label: 'Notes' },
    ]
  ));

  return sections.join('\n');
}

/**
 * Parses a multi-section CSV string into a Partial<LegacyData> object.
 */
export function parseTabularCsv(csvString: string): Partial<LegacyData> {
  const lines = csvString.split(/\r?\n/);
  const updates: Partial<LegacyData> = {};

  let currentSection: string | null = null;
  let currentHeaders: string[] = [];
  let dataForSection: any[] = []; 

  const expectedHeaders: { [key: string]: { key: string; label: string }[] } = {
    'MANUAL_ACCOUNTS_START': [
      { key: 'service', label: 'Service' },
      { key: 'username', label: 'Username' },
      { key: 'password', label: 'Password' },
      { key: 'notes', label: 'Notes' },
    ],
    'PROFESSIONAL_TEAM_START': [
      { key: 'role', label: 'Role' },
      { key: 'name', label: 'Name' },
      { key: 'phone', label: 'Phone' },
      { key: 'email', label: 'Email' },
    ],
    'FIRST_STEPS_START': [
      { key: 'text', label: 'Text' },
      { key: 'completed', label: 'Completed' },
    ],
    'HOUSEHOLD_UTILITIES_START': [
      { key: 'type', label: 'Type' },
      { key: 'provider', label: 'Provider' },
      { key: 'cost', label: 'Cost' },
      { key: 'website', label: 'Website' },
    ],
    'HOUSEHOLD_MAINTENANCE_START': [
      { key: 'type', label: 'Type' },
      { key: 'company', label: 'Company' },
      { key: 'contact', label: 'Contact' },
      { key: 'notes', label: 'Notes' },
    ],
  };

  const defaultHousehold: Household = {
    mortgage: { company: '', contact: '', website: '', monthly: '' },
    insurance: { company: '', contact: '', website: '' },
    security: { provider: '', safeWord: '', alarmCode: '' },
    utilities: [],
    maintenance: [],
    hvac: { lastFilterChange: '', installedBy: '', warranty: '' },
  };

  const processSection = (sectionName: string | null, sectionData: any[]) => {
    if (!sectionName || sectionData.length < 1) return;

    const mappedHeaders = expectedHeaders[sectionName];
    if (!mappedHeaders) return;

    const sectionUpdates: any[] = [];
    for (const row of sectionData) {
      const item: any = { id: Date.now().toString() + Math.random().toString(36).substring(2, 9) }; 
      mappedHeaders.forEach(header => {
        let value = row[header.label];
        if (header.key === 'completed') {
          item[header.key] = value.toUpperCase() === 'TRUE' || value === '1';
        } else {
          item[header.key] = value;
        }
      });
      sectionUpdates.push(item);
    }

    switch (sectionName) {
      case 'MANUAL_ACCOUNTS_START':
        updates.manualAccounts = sectionUpdates;
        break;
      case 'PROFESSIONAL_TEAM_START':
        updates.professionalTeam = sectionUpdates;
        break;
      case 'FIRST_STEPS_START':
        updates.firstSteps = sectionUpdates;
        break;
      case 'HOUSEHOLD_UTILITIES_START':
        updates.household = updates.household || { ...defaultHousehold }; 
        updates.household.utilities = sectionUpdates;
        break;
      case 'HOUSEHOLD_MAINTENANCE_START':
        updates.household = updates.household || { ...defaultHousehold }; 
        updates.household.maintenance = sectionUpdates;
        break;
    }
  };

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('#') || trimmedLine === '') continue;

    if (trimmedLine.endsWith('_START')) {
      processSection(currentSection, dataForSection);
      currentSection = trimmedLine;
      currentHeaders = [];
      dataForSection = [];
    } else if (currentSection && currentHeaders.length === 0) {
      currentHeaders = trimmedLine.split(',').map(h => _unescapeCsv(h));
    } else if (currentSection && currentHeaders.length > 0) {
      const rowValues = trimmedLine.split(',').map(v => _unescapeCsv(v));
      if (rowValues.length === currentHeaders.length) {
        const rowObject: Record<string, string> = {};
        currentHeaders.forEach((header, index) => {
          rowObject[header] = rowValues[index];
        });
        dataForSection.push(rowObject);
      }
    }
  }

  processSection(currentSection, dataForSection);
  return updates;
}

/**
 * Initiates a file download with the given filename and content.
 */
export function downloadCsv(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * Handles reading an uploaded CSV file.
 */
export function uploadCsv(file: File, callback: (parsedData: Partial<LegacyData>) => void, onError: (error: string) => void) {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const csvContent = event.target?.result as string;
      const parsed = parseTabularCsv(csvContent);
      callback(parsed);
    } catch (err: any) {
      onError(`Failed to parse CSV: ${err.message || 'Unknown error'}`);
    }
  };
  reader.onerror = () => onError('Failed to read file.');
  reader.readAsText(file);
}
