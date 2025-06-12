import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import CountryGamePage from './pages/CountryGamePage';
import CustomGamePage from './pages/CustomGamePage';
import TeamListPage from './pages/TeamListPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/pais" element={<CountryGamePage />} />
        <Route path="/personalizado" element={<CustomGamePage />} />
        <Route path="/listagem" element={<TeamListPage />} />
        <Route path="*" element={<CountryGamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
