import { AppBar, Toolbar, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Contribution, Status } from 'renderer/models/contribution';
import ContributionComponent from '../components/contribution';

const Contributions = () => {
  const contributions: Contribution[] = [
    {
      title: 'Historia; NPCs; Keyfree Events...',
      lastUpdate: new Date(),
      ownerName: 'PHSticks#1456',
      status: Status.APPROVED,
    },
    {
      title: 'Historia; NPCs; Keyfree Events...',
      lastUpdate: new Date(),
      ownerName: 'PHSticks#1456',
      status: Status.OPEN,
    },
    {
      title: 'Historia; NPCs; Keyfree Events...',
      lastUpdate: new Date(),
      ownerName: 'PHSticks#1456',
      status: Status.CANCELLED,
    },
    {
      title: 'Historia; NPCs; Keyfree Events...',
      lastUpdate: new Date(),
      ownerName: 'PHSticks#1456',
      status: Status.REVIEW,
    },
  ];
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Contribuições
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack>
        {contributions.map((contribution) => (
          <ContributionComponent contribution={contribution} />
        ))}
      </Stack>
    </div>
  );
};
export default Contributions;
