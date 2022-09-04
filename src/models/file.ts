export interface TranslationFile {
  fileName: string;
  storagePath: string;
  type: FileType;
  status: FileStatus;
  lockerName?: string;
  firestorePath?: string;
  files?: TranslationFile[];
  parent?: string;
}

export enum FileType {
  FOLDER = 'FOLDER',
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}

export enum FileStatus {
  OPEN = 'OPEN',
  LOCKED = 'LOCKED',
  TRANSLATED = 'TRANSLATED',
}
