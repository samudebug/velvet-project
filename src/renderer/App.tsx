import { Button } from '@mui/material';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import Contributions from './pages/contributions';

const Hello = () => {
  return <Button variant="contained">Hello World</Button>;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/contributions" />} />
        <Route path="/contributions" element={<Contributions />} />
      </Routes>
    </Router>
  );
}
