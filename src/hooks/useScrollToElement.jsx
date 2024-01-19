import { useEffect } from 'react';

function useScrollToElement(id, clicked) {
  useEffect(() => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  }, [id, clicked]);
}

export default useScrollToElement;
