// File: src/components/ScrollToTop.jsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * This component scrolls the window to the top (0, 0) whenever the
 * pathname changes. This is used to prevent the scroll position from
 * persisting when navigating between routes in a single-page app.
 */
const ScrollToTop = () => {
  // Get the current location's pathname from react-router-dom
  const { pathname } = useLocation();

  // The useEffect hook will run every time the 'pathname' dependency changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // This component does not render any visible UI, so it returns null
  return null;
};

export default ScrollToTop;
