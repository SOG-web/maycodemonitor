import { createContext } from 'react';
import { Record } from '../api/interface/records/record.interface';

export interface RecordContextProps {
  records: Record[];
  setRecords: (records: Record[]) => void;
  viewRecord: Record | null;
  setViewRecord: (record: Record | null) => void;
}

export const RecordContext = createContext({} as RecordContextProps);
