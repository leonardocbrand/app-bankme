import { Route, Routes } from 'react-router-dom';
import Dashboard from '@/pages/dashboard/Dashboard';
import { Home } from '@/pages/Home';

function Router() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/dashboard" element={ <Dashboard /> } />
    </Routes>
  );
}

export default Router;
