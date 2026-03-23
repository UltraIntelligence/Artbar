
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ThemeInjector } from './components/ThemeInjector';
import { Home } from './pages/Home';
import { Instructors } from './pages/Instructors';
import { TeamBuilding } from './pages/TeamBuilding';
import { PrivateParties } from './pages/PrivateParties';
import { Locations } from './pages/Locations';
import { Press } from './pages/Press';
import { Contact } from './pages/Contact';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';
import { PaintYourPet } from './pages/PaintYourPet';
import { ThemeDetail } from './pages/ThemeDetail';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';

const App: React.FC = () => {
  return (
    <ContentProvider>
      <ThemeInjector />
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen font-sans text-artbar-navy selection:bg-artbar-taupe selection:text-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/instructors" element={<Instructors />} />
              <Route path="/team-building" element={<TeamBuilding />} />
              <Route path="/private-parties" element={<PrivateParties />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/press" element={<Press />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/paint-your-pet" element={<PaintYourPet />} />
              <Route path="/themes/:slug" element={<ThemeDetail />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ContentProvider>
  );
};

export default App;
