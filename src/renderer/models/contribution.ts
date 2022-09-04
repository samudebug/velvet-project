import { TranslationFile } from 'models/file';

export interface Contribution {
  id?: string;
  lastUpdate: Date;
  createdDate: Date;
  title: string;
  ownerName: string;
  status: Status;
  files: TranslationFile[];
}

export enum Status {
  OPEN = 'OPEN',
  REVIEW = 'REVIEW',
  CANCELLED = 'CANCELLED',
  APPROVED = 'APPROVED',
}
