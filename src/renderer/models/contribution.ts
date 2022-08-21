export interface Contribution {
  lastUpdate: Date;
  title: string;
  ownerName: string;
  status: Status;
}

export enum Status {
  OPEN = 'OPEN',
  REVIEW = 'REVIEW',
  CANCELLED = 'CANCELLED',
  APPROVED = 'APPROVED',
}
