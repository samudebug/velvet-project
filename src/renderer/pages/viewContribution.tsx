import { Button, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import { TranslationFile } from 'models/file';
import FileList from 'renderer/components/fileList';
import { useParams } from 'react-router-dom';
import { Contribution } from 'renderer/models/contribution';
import { getContribution } from 'renderer/services/contributions';
import StatusComponent from 'renderer/components/status/status';

const ViewContribution: React.FC = () => {
  const [value, setValue] = useState(0);
  const [files, setFiles] = useState<TranslationFile[]>([]);
  const [contribution, setContribution] = useState<Contribution | undefined>(
    undefined
  );
  const { contributionId } = useParams();
  useEffect(() => {
    window.electron.ipcRenderer.once('read-files', async (arg) => {
      setFiles(arg as TranslationFile[]);
    });
    window.electron.ipcRenderer.sendMessage('read-files', [contributionId]);
    getContribution(contributionId!)
      .then((data) => setContribution(data))
      .catch((err) => console.error(err));
  }, [contributionId]);

  const onFolderOpen = () => {
    window.electron.ipcRenderer.sendMessage('open-folder', [contributionId]);
  };
  const onToolOpen = () => {
    window.electron.ipcRenderer.sendMessage('open-tool', []);
  };
  const onFileOpen = (file: TranslationFile) => {
    window.electron.ipcRenderer.sendMessage('open-file', [file.storagePath]);
  };
  if (contribution) {
    return (
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box>
              <Tabs value={value} variant="fullWidth">
                <Tab label="Arquivos" icon={<FolderIcon />} />
              </Tabs>
            </Box>
            <FileList files={files} onFileOpen={onFileOpen} display />
          </Grid>
          <Grid item xs={4} my={2}>
            <Stack spacing={2}>
              <Stack spacing={2} direction="row">
                <Typography variant="h5" component="p">
                  Status:
                </Typography>
                <StatusComponent status={contribution!.status} />
              </Stack>
              <Stack spacing={2} direction="row">
                <Typography variant="h5" component="p">
                  Criada em:
                </Typography>
                <Typography variant="h5" component="p">
                  {contribution?.createdDate.toLocaleDateString('pt-br')}
                </Typography>
              </Stack>
              <Button variant="contained" onClick={onFolderOpen}>
                Abrir Arquivos
              </Button>
              <Button variant="contained" onClick={onToolOpen}>
                Abrir Persona Editor
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  }
  return <div />;
};
export default ViewContribution;
