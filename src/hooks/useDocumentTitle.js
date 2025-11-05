import { useEffect } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title;
    
    // Cleanup function to reset the title when the component unmounts
    return () => {
      document.title = 'frontend';
    };
  }, [title]); // Only re-run if the title changes
};

export default useDocumentTitle;
