export interface Address {
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  condominium: string;
  city: string;
  postalCode: number;
  state: string;
}

export interface ProjectData {
  id?: number;
  projectName: string;
  observations: string;
  startDate: string;
  endDate: string;
  status: string;
  category: string;
  area: number;
  cno: string;
  art: string;
  technicalLeadName: string;
  architectName: string;
  contractValue: string | number;
  rrt: string;
  foremanName: string;
  address: Address;
}

export interface ProjectDataFromApi {
  prj_id: number;
  cus_id: number;
  add_id: number;
  prj_name: string;
  prj_start_date: string;
  prj_end_date: string;
  prj_status: string;
  prj_category: string;
  prj_area: number;
  prj_contract_value: number;
  prj_cno: string;
  prj_technical_lead_name: string;
  prj_art: string;
  prj_architect_name: string;
  prj_rrt: number;
  prj_contract_type: string;
  prj_foreman_name: string;
  prj_observations: string;
  usr_id: number;
  usr_username: null;
  createdAt: string;
  updatedAt: string;
}
