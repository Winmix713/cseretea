import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/themeContext';
import { SidebarProvider } from './contexts/sidebarContext';
import DashboardLayout from './components/layout/DashboardLayout';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHealth from './pages/admin/AdminHealth';
import AdminJobs from './pages/admin/AdminJobs';
import AdminPredictions from './pages/admin/AdminPredictions';
import AdminStats from './pages/admin/AdminStats';
import AdminModels from './pages/admin/AdminModels';
import AdminPhase9 from './pages/admin/AdminPhase9';
import AdminFeedback from './pages/admin/AdminFeedback';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SidebarProvider>
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/jobs" element={<div>Scheduled Jobs Page (Phase 3)</div>} />
              <Route path="/analytics" element={<div>Analytics Page (Phase 4)</div>} />

              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/health" element={<AdminHealth />} />
              <Route path="/admin/jobs" element={<AdminJobs />} />
              <Route path="/admin/predictions" element={<AdminPredictions />} />
              <Route path="/admin/stats" element={<AdminStats />} />
              <Route path="/admin/models" element={<AdminModels />} />
              <Route path="/admin/phase9" element={<AdminPhase9 />} />
              <Route path="/admin/feedback" element={<AdminFeedback />} />
            </Route>
          </Routes>
        </SidebarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
