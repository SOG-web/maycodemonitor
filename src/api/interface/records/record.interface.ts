export interface RecordResponse {
  data: {
    records: Record[];
    status: boolean;
  } | null;
  status: boolean;
  error: any;
}

export interface Record {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  time: string;
  recordId: string;
  description: string;
  data: RecordData[];
}

export interface RecordData {
  createdAt: string;
  updatedAt: string;
  id: string;
  dataId: string;
  user: string;
  recordId: string;
  data: any[];
}
