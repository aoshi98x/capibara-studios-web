import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectDetail from './pages/ProjectDetail';
import Hero from './components/Hero';
import { FeaturedProject } from './components/FeaturedProject';
import { AboutServices } from './components/AboutServices';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <BrowserRouter basename="/"> {/* Importante para GitHub Pages */}
      <div className="bg-capibara-black min-h-screen">
        <Navbar />
        <Routes>
          {/* RUTA PRINCIPAL (Landing) */}
          <Route path="/" element={
            <>
              <Hero />
              <FeaturedProject />
              <AboutServices />
              <Portfolio />
              <Contact />
            </>
          } />
          <Route path="/project/:slug" element={<ProjectDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;