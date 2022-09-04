import { AppBar, Toolbar, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/system';
import { Contribution, Status } from 'renderer/models/contribution';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getContributions } from 'renderer/services/contributions';
import ContributionComponent from '../components/contribution';

const Contributions = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  useEffect(() => {
    getContributions()
      .then((data) => setContributions(data))
      .catch((err) => console.error(err));
  }, []);
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
          <Link
            to={`/contributions/view/${contribution.id}`}
            key={contribution.id}
          >
            <ContributionComponent contribution={contribution} />
          </Link>
        ))}
        <Link to="/contributions/new">
          <Fab
            variant="extended"
            color="primary"
            sx={{
              position: 'fixed',
              bottom: (theme) => theme.spacing(2),
              right: (theme) => theme.spacing(2),
            }}
          >
            <AddIcon />
            NOVA CONTRIBUIÇÃO
          </Fab>
        </Link>
      </Stack>
    </div>
  );
};
export default Contributions;
