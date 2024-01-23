/* eslint-disable default-param-last */
import { useEffect, useState } from 'react';

function useScrollToElement(id, block, behavior) {
  const [clicked, setClicked] = useState();

  useEffect(() => {
    if (window.matchMedia('(max-width: 1024px)').matches) {
      const element = document.getElementById(id);
      if (!element) return;

      element.scrollIntoView({
        inline: 'nearest',
        block: block || 'start',
        behavior: behavior || 'smooth',
      });
    }
  }, [id, clicked]);

  return [setClicked];
}

export default useScrollToElement;
