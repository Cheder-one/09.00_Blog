import { useEffect } from 'react';

function useScrollToElement(id, type = 'smooth') {
  useEffect(() => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({
      behavior: type,
      block: 'center',
      inline: 'nearest',
    });
  }, [id]);
}

export default useScrollToElement;
