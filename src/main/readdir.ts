import fs from 'fs/promises';
import { FileStatus, FileType, TranslationFile } from '../models/file';

const readFiles = async (path: string): Promise<TranslationFile[]> => {
  const entries = await fs.readdir(path, {
    withFileTypes: true,
  });
  return Promise.all(
    entries.map(async (entry) => {
      const fullPath = path + entry.name;
      if (entry.isDirectory()) {
        const folderPath = `${fullPath}\\`;
        return {
          fileName: entry.name,
          storagePath: folderPath,
          type: FileType.FOLDER,
          status: FileStatus.LOCKED,
          files: await readFiles(folderPath),
        };
      }
      if (entry.name.toLowerCase().endsWith('.ptp')) {
        return {
          fileName: entry.name,
          storagePath: fullPath,
          type: FileType.TEXT,
          status: FileStatus.LOCKED,
        };
      }
      return {
        fileName: entry.name,
        storagePath: fullPath,
        type: FileType.IMAGE,
        status: FileStatus.LOCKED,
      };
    })
  );
};
export default readFiles;
