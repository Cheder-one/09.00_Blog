/* eslint-disable default-param-last */
import { useEffect, useState } from 'react';

function useScrollToElement(id, block, behavior, validation = true) {
  const mediaQuery = window.matchMedia('(max-height: 650px)').matches;
  const [clicked, setClicked] = useState();

  useEffect(() => {
    if (mediaQuery || !validation) {
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
