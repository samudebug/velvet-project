import { getBytes, ref } from 'firebase/storage';
import fs from 'fs-extra';
import { TranslationFile } from 'models/file';
import os from 'os';
import path from 'path';

import storage from './firebase';

const downloadPermFiles = async (
  contributionId: string,
  files: TranslationFile[]
) => {
  const contributionPath = path.join(
    os.homedir(),
    'Documents',
    'Traduções',
    contributionId
  );
  try {
    const returnFiles = await Promise.all(
      files.map(async (file) => {
        const storageRef = ref(storage, file.storagePath);
        const fileBytes = await getBytes(storageRef);
        await fs.outputFile(
          `${contributionPath}\\${file.storagePath}`,
          Buffer.from(fileBytes)
        );
        return {
          ...file,
          storagePath: `${contributionPath}\\${file.storagePath}`,
        };
      })
    );
    return returnFiles;
  } catch (error) {
    console.error(error);
    return '';
  }
};
export default downloadPermFiles;
