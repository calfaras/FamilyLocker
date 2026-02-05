
import { LegacyData } from './types';

export const INITIAL_DATA: LegacyData = {
  creatorDetails: {
    legalName: '',
    address: '',
    state: '',
    zipCode: '',
  },
  wantsLocalServicesInfo: false, // New field
  localServicesNotes: '', // New field
  personalNotes: {
    partnerLetter: '',
    childrenLetter: '',
    intentions: ''
  },
  firstSteps: [
    { id: '1', text: 'Call Advisor and Primary Family Member', completed: false },
    { id: '2', text: 'Log in to Password Manager', completed: false },
    { id: '3', text: 'Ensure access to main financial accounts for continuity', completed: false },
    { id: '4', text: 'Locate estate planning documents (Fire box / Safe)', completed: false }
  ],
  passwords: {
    manager: '',
    username: '',
    masterPassword: ''
  },
  manualAccounts: [
    { id: 'email-gmail', service: 'Gmail', username: '', password: '', notes: '' },
    { id: 'email-yahoo', service: 'Yahoo Mail', username: '', password: '', notes: '' },
    { id: 'email-outlook', service: 'Outlook/Hotmail', username: '', password: '', notes: '' },
  ], // Initialize new field with defaults
  criticalDocs: {
    estatePlanSummary: '',
    attachedEstatePlanFiles: [], 
    digitalCopiesLocation: '',
    attachedDigitalCopiesFiles: [], 
    healthDirectivesLocation: '',
    attachedHealthDirectivesFiles: [], 
    idLocations: '',
    attachedIdFiles: [], 
  },
  subscriptions: [],
  digitalItems: {
    phoneCarrier: '',
    phonePin: '',
    socialMediaInstructions: '',
    cloudStorage: '',
    domainLogins: ''
  },
  finances: {
    brokerage: '',
    banks: '',
    creditCards: '',
    crypto: '',
    linkedApps: '',
    fiveTwoNine: '',
    spreadsheetLink: '',
    attachedSpreadsheetFiles: [], 
    lifeInsurance: {
      benefit: '',
      company: '',
      premiums: '',
      instructions: '',
      attachedFiles: [] 
    },
    otherInvestments: ''
  },
  professionalTeam: [
    { id: '1', role: 'Financial Advisor', name: '', phone: '', email: '' },
    { id: '2', role: 'Estate Attorney', name: '', phone: '', email: '' },
    { id: '3', role: 'Accountant', name: '', phone: '', email: '' }
  ],
  petCare: {
    provider: '',
    food: '',
    medications: '',
    dogsitter: '',
    grooming: ''
  },
  household: {
    mortgage: { company: '', contact: '', website: '', monthly: '' },
    insurance: { company: '', contact: '', website: '' },
    security: { provider: '', safeWord: '', alarmCode: '' },
    utilities: [
      { id: '1', type: 'Power', provider: '', cost: '', website: '' },
      { id: '2', type: 'Water', provider: '', cost: '', website: '' },
      { id: '3', type: 'Gas', provider: '', cost: '', website: '' }
    ],
    maintenance: [
      { id: '1', type: 'Landscaping', company: '', contact: '', notes: '' },
      { id: '2', type: 'Plumbing', company: '', contact: '', notes: '' }
    ],
    hvac: { lastFilterChange: '', installedBy: '', warranty: '' }
  }
};