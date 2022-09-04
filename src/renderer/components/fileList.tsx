import { FileType, TranslationFile } from 'models/file';
import {
  Checkbox,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import TitleIcon from '@mui/icons-material/Title';
import ImageIcon from '@mui/icons-material/Image';
import React, { useState } from 'react';
import { Stack } from '@mui/system';

export interface FileListItemProps {
  item: TranslationFile;
  onFileSelected?: (file: TranslationFile) => void;
  onFileOpen?: (file: TranslationFile) => void;
  onDeselectFile?: (file: TranslationFile) => void;
  display?: boolean;
}

const FileListItem: React.FC<FileListItemProps> = (
  props: FileListItemProps
) => {
  const { item, onFileSelected, onFileOpen, onDeselectFile, display } = props;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    event.preventDefault();
    if (event.target.checked && onFileSelected) onFileSelected(item);
    else if (onDeselectFile) onDeselectFile(item);
    setSelected(event.target.checked);
  };
  const getItemIcon = (type: FileType) => {
    switch (type) {
      case FileType.TEXT:
        return (
          <Stack direction="row" alignItems="center">
            {!display ? (
              <Checkbox
                edge="start"
                checked={selected}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': item.fileName }}
                onChange={handleSelect}
              />
            ) : (
              <div />
            )}
            <TitleIcon />
          </Stack>
        );
      case FileType.IMAGE:
        return (
          <Stack direction="row" alignItems="center">
            {!display ? (
              <Checkbox
                edge="start"
                checked={selected}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': item.fileName }}
                onChange={handleSelect}
              />
            ) : (
              <div />
            )}
            <ImageIcon />
          </Stack>
        );
      case FileType.FOLDER:
        return <FolderIcon />;
      default:
        return <FolderIcon />;
    }
  };
  const openFolder = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    event.preventDefault();
    if (item.type === FileType.FOLDER) {
      setOpen(!open);
    }
  };
  const handleFileClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    event.preventDefault();
    if (onFileOpen) onFileOpen(item);
  };

  return (
    <div>
      <ListItemButton
        onClick={item.files ? openFolder : undefined}
        onDoubleClick={!item.files ? handleFileClick : undefined}
      >
        <ListItemIcon>{getItemIcon(item.type)}</ListItemIcon>
        <ListItemText primary={item.fileName} />
      </ListItemButton>
      {item.files ? (
        <Collapse in={open} unmountOnExit sx={{ pl: 4 }}>
          <List component="div" disablePadding>
            {item.files.map((file) => (
              <FileListItem
                key={file.storagePath}
                item={file}
                onFileSelected={onFileSelected}
                onFileOpen={onFileOpen}
                onDeselectFile={onDeselectFile}
              />
            ))}
          </List>
        </Collapse>
      ) : (
        <div />
      )}
    </div>
  );
};
type FileListProps = {
  files: TranslationFile[];
  onFileSelected?: (file: TranslationFile) => void;
  onFileOpen?: (file: TranslationFile) => void;
  onDeselectFile?: (file: TranslationFile) => void;
  display?: boolean;
};

const FileList: React.FC<FileListProps> = (props: FileListProps) => {
  const { files, onFileSelected, onFileOpen, onDeselectFile, display } = props;
  return (
    <Paper elevation={3}>
      <List>
        {files.map((file) => (
          <FileListItem
            key={file.storagePath}
            item={file}
            onFileSelected={onFileSelected}
            onFileOpen={onFileOpen}
            onDeselectFile={onDeselectFile}
            display={display}
          />
        ))}
      </List>
    </Paper>
  );
};

export default FileList;
