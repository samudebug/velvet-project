import { exec } from 'child_process';
import path from 'path';

const openFile = (filePath: string) => {
  if (filePath.toLowerCase().endsWith('.ptp')) {
    const executePtpCommand = `"${path.resolve(
      './assets/PersonaEditor/PersonaEditor.exe'
    )}" "${filePath}"`;
    exec(executePtpCommand);
    return;
  }
  exec(`"${filePath}"`);
};
export default openFile;
