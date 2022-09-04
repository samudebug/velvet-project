import { getBytes, ref } from 'firebase/storage';
import fs from 'fs-extra';
import os from 'os';
import path from 'path';

import storage from './firebase';

const downloadTempFile = async (storagePath: string) => {
  const tempDirPath = path.join(os.tmpdir(), 'project-velvet');
  try {
    const tmpDir = await fs.mkdtemp(tempDirPath);
    const storageRef = ref(storage, storagePath);
    const fileBytes = await getBytes(storageRef);
    await fs.outputFile(`${tmpDir}\\${storagePath}`, Buffer.from(fileBytes));
    return `${tmpDir}\\${storagePath}`;
  } catch (error) {
    console.error(error);
    return '';
  }
};
export default downloadTempFile;
