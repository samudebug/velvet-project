import { Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Contribution } from 'renderer/models/contribution';
import StatusComponent from './status/status';

type ContributionProps = {
  contribution: Contribution;
};
const ContributionComponent: React.FC<ContributionProps> = (
  props: ContributionProps
) => {
  const { contribution } = props;
  return (
    <Grid container spacing={2} my={4}>
      <Grid item container xs={2} justifyContent="center" alignItems="center">
        <StatusComponent status={contribution.status} />
      </Grid>
      <Grid item container xs={10} justifyContent="center" alignItems="center">
        <Stack spacing={2}>
          <Typography variant="h5" component="p">
            {contribution.ownerName}
          </Typography>
          <Typography variant="h3" component="p" noWrap>
            {contribution.title}
          </Typography>
          <Typography variant="h5" component="p">
            Última atualização:{' '}
            {contribution.lastUpdate.toLocaleDateString('pt-BR')}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ContributionComponent;
