import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Contributions from './pages/contributions';
import NewContribution from './pages/newContribution';
import ViewContribution from './pages/viewContribution';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/contributions" />} />
        <Route path="/contributions" element={<Contributions />} />
        <Route path="/contributions/new" element={<NewContribution />} />
        <Route
          path="/contributions/view/:contributionId"
          element={<ViewContribution />}
        />
      </Routes>
    </Router>
  );
}
