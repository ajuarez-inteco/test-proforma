import { useEffect, useState } from 'react';

const useOutsideClick = (ref) => {
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setDisplay(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return [display, setDisplay];
};

export default useOutsideClick;
