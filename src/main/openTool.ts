import { exec } from 'child_process';
import path from 'path';

const openTool = () => {
  const executePtpCommand = `"${path.resolve(
    './assets/PersonaEditor/PersonaEditor.exe'
  )}"`;
  exec(executePtpCommand);
};
export default openTool;
