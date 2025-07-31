import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import AdventurePage from './pages/AdventurePage';
import AdventureDetailPage from './pages/AdventureDetailPage';
import PlayPage from './pages/PlayPage';

const AppContent = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/u/account" element={<AccountPage />} />
            <Route path="/adventure" element={<AdventurePage />} />
            <Route path="/adventure/:adventureId" element={<AdventureDetailPage />} />
            <Route path="/play" element={<PlayPage />} />
          </Routes>
        </DashboardLayout>
      } />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;