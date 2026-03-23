
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if this is the very first load of the session
    const hasVisited = sessionStorage.getItem('artbar_visited');
    
    if (!hasVisited) {
      sessionStorage.setItem('artbar_visited', 'true');
      // If they tried to land on a subpage directly on first load, 
      // we redirect them to home to ensure they see the landing experience.
      if (pathname !== '/' && !pathname.startsWith('/admin')) {
        navigate('/', { replace: true });
      }
    }

    // Standard scroll to top behavior for navigation
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash, navigate]);

  return null;
};
