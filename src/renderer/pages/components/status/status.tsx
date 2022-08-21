import { Chip } from '@mui/material';
import React from 'react';
import { Status } from 'renderer/models/contribution';
import './status.css';

type StatusProps = {
  status: Status;
};
const StatusComponent: React.FC<StatusProps> = ({ status }) => {
  const data = () => {
    switch (status) {
      case Status.OPEN:
        return <Chip className="open" label="Aberta" />;
      case Status.REVIEW:
        return <Chip className="review" label="Em Revisão" />;
      case Status.APPROVED:
        return <Chip className="approved" label="Aprovada" />;
      case Status.CANCELLED:
        return <Chip className="cancelled" label="Cancelada" />;
      default:
        return <div />;
    }
  };
  return <div>{data()}</div>;
};
export default StatusComponent;
