export interface Address {
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  postalCode: number;
}

export interface ProjectData {
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  category: string;
  area: number;
  cno: string;
  art: string;
  technicalLeadName: string;
  architectName: string;
  contractValue: number;
  rrt: string;
  master: string;
  address: Address;
}
