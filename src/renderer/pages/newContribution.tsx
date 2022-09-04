import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import FileList from 'renderer/components/fileList';
import { TranslationFile } from 'models/file';
import CheckIcon from '@mui/icons-material/Check';
import { Status } from 'renderer/models/contribution';
import {
  createContribution,
  updateContribution,
} from 'renderer/services/contributions';
import { useNavigate } from 'react-router-dom';
import { getAllFiles } from '../services/translationFilesService';

const NewContribution: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<TranslationFile[]>([]);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [files, setFiles] = useState<TranslationFile[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllFiles()
      .then((data) => {
        setFiles(data);
        return '';
      })
      .catch((err) => console.error(err));
  }, []);

  const onFileSelected = (file: TranslationFile) => {
    const oldFiles = [...selectedFiles];
    oldFiles.push(file);
    setSelectedFiles(oldFiles);
  };
  const onDeselectFile = (file: TranslationFile) => {
    const oldFiles = [...selectedFiles];
    const oldFileIndex = oldFiles.findIndex(
      (el) => el.storagePath === file.storagePath
    );
    if (oldFileIndex > -1) {
      oldFiles.splice(oldFileIndex, 1);
    }
    setSelectedFiles(oldFiles);
  };
  const onFileOpen = (file: TranslationFile) => {
    window.electron.ipcRenderer.once('download-temp-file', (arg) => {
      window.electron.ipcRenderer.sendMessage('open-file', [arg]);
    });
    window.electron.ipcRenderer.sendMessage('download-temp-file', [
      file.storagePath,
    ]);
  };
  const handleClose = () => {
    setConfirmationOpen(false);
  };

  const handleCreate = async () => {
    const newContribution = {
      createdDate: new Date(),
      lastUpdate: new Date(),
      title: 'Test',
      ownerName: 'Test',
      status: Status.OPEN,
      files: selectedFiles,
    };
    const { id: contributionId } = await createContribution(newContribution);
    window.electron.ipcRenderer.once('download-perm-files', async (arg) => {
      await updateContribution(contributionId, {
        files: arg as TranslationFile[],
      });
      navigate('/contributions', { replace: true });
    });
    window.electron.ipcRenderer.sendMessage('download-perm-files', [
      contributionId,
      selectedFiles,
    ]);
  };

  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };

  return (
    <div>
      <Stack spacing={4} m={2}>
        <Typography variant="h3" component="h3">
          Escolha os arquivos que quer traduzir
        </Typography>
        <Typography variant="h5" component="p">
          Você pode clicar duas vezes em um arquivo para abrir a prévia dele.
        </Typography>
        <FileList
          files={files}
          onFileSelected={onFileSelected}
          onFileOpen={onFileOpen}
          onDeselectFile={onDeselectFile}
        />
        {selectedFiles.length > 0 ? (
          <Fab
            onClick={handleConfirmationOpen}
            variant="extended"
            color="primary"
            sx={{
              position: 'fixed',
              bottom: (theme) => theme.spacing(2),
              right: (theme) => theme.spacing(2),
            }}
          >
            <CheckIcon />
            CRIAR CONTRIBUIÇÃO
          </Fab>
        ) : (
          <div />
        )}
      </Stack>
      <Dialog open={isConfirmationOpen} onClose={handleClose}>
        <DialogTitle>Aviso</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao criar uma contribuição, lembre-se destas duas coisas para que sua
            contribuição não seja cancelada automaticamente:
            <br />
            <ul>
              <li>
                Ter alguma atividade em sua contribuição em pelo menos 15 dias
              </li>
              <li>
                Enviar sua contribuição para revisão em pelo menos 30 dias
              </li>
            </ul>
            <br />
            Deseja Continuar?
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Não
              </Button>
              <Button onClick={handleCreate}>Sim</Button>
            </DialogActions>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default NewContribution;
