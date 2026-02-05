

export interface AttachedFile {
  id: string;
  name: string;
  mimeType: string;
  base64Data: string; // Base64 encoded file content
  size: number; // File size in bytes
}

export interface ManualAccount {
  id: string;
  service: string;
  username: string;
  password: string;
  notes: string;
}

export interface CreatorDetails {
  legalName: string;
  address: string;
  state: string;
  zipCode: string;
}

export interface FirstStep {
  id: string; 
  text: string; 
  completed: boolean;
}

export interface ProfessionalTeam {
  id: string;
  role: string;
  name: string;
  phone: string;
  email: string;
}

export interface HouseholdUtility {
  id: string; 
  type: string; 
  provider: string; 
  cost: string; 
  website: string;
}

export interface HouseholdMaintenanceItem {
  id: string; 
  type: string; 
  company: string; 
  contact: string; 
  notes: string;
}

// Extracted Household interface to resolve import errors in csvUtils.ts
export interface Household {
  mortgage: { company: string; contact: string; website: string; monthly: string };
  insurance: { company: string; contact: string; website: string };
  security: { provider: string; safeWord: string; alarmCode: string };
  utilities: Array<HouseholdUtility>;
  maintenance: Array<HouseholdMaintenanceItem>;
  hvac: { lastFilterChange: string; installedBy: string; warranty: string };
}


export interface LegacyData {
  creatorDetails: CreatorDetails; // New: Creator's legal name and address
  wantsLocalServicesInfo: boolean; // New: User preference for local services info
  localServicesNotes: string; // New: Manually entered notes for local services
  personalNotes: {
    partnerLetter: string;
    childrenLetter: string;
    intentions: string;
  };
  firstSteps: Array<FirstStep>;
  passwords: {
    manager: string;
    username: string;
    masterPassword: string;
  };
  manualAccounts: ManualAccount[]; // New: For users without a manager
  criticalDocs: {
    estatePlanSummary: string;
    attachedEstatePlanFiles: AttachedFile[]; // New: Files for Estate Plan
    digitalCopiesLocation: string;
    attachedDigitalCopiesFiles: AttachedFile[]; // New: Files for Digital Copies
    healthDirectivesLocation: string;
    attachedHealthDirectivesFiles: AttachedFile[]; // New: Files for Health Directives
    idLocations: string;
    attachedIdFiles: AttachedFile[]; // New: Files for ID Locations
  };
  subscriptions: Array<{ id: string; name: string; cost: string; category: string }>;
  digitalItems: {
    phoneCarrier: string;
    phonePin: string;
    socialMediaInstructions: string;
    cloudStorage: string;
    domainLogins: string;
  };
  finances: {
    brokerage: string;
    banks: string;
    creditCards: string;
    crypto: string;
    linkedApps: string;
    fiveTwoNine: string;
    spreadsheetLink: string;
    attachedSpreadsheetFiles: AttachedFile[]; // New: Files for Balance Sheet
    lifeInsurance: {
      benefit: string;
      company: string;
      premiums: string;
      instructions: string;
      attachedFiles: AttachedFile[]; // New: Files for Life Insurance
    };
    otherInvestments: string;
  };
  professionalTeam: Array<ProfessionalTeam>;
  petCare: {
    provider: string;
    food: string;
    medications: string;
    dogsitter: string;
    grooming: string;
  };
  household: Household;
}

export type SectionId = 
  | 'overview' 
  | 'personal' 
  | 'first-steps' 
  | 'passwords' 
  | 'docs' 
  | 'finances' 
  | 'digital' 
  | 'team' 
  | 'pets' 
  | 'household';