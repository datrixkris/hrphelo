export interface Company {
    id: number; // Add an id field for each company
    companyName: string;
    location: string;
    noOfStaff: number;
    dateRegistered: string;
  }

export interface CompanyDetails {
    companyName: string;               // Name of the company
    locationAddress: string;           // Address of the company's location
    contactPersonName: string;         // Name of the contact person
    contactPersonNumber: string;       // Phone number of the contact person
    companyTelephone: string;          // Company's telephone number
    numberOfStaff: number;             // Number of staff in the company
    companyEmail: string;              // Company's email address
    companyRegistrationDocument: string;  // URL or file path to the registration document
    directorsNationalIDs: string[];    // Array of National ID numbers of directors
  }