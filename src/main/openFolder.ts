import { exec } from 'child_process';

const openFolder = (filePath: string) => {
  exec(`explorer "${filePath}"`);
};
export default openFolder;
