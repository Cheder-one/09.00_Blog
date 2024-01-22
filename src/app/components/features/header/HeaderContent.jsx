import { HeaderSkeleton } from '../../ui';

import HeaderAuth from './HeaderAuth';
import HeaderNotAuth from './HeaderNotAuth';

function HeaderContent({ isAuthenticated, isAuthLoaded }) {
  if (isAuthenticated) {
    return <HeaderAuth />;
  }
  if (!isAuthLoaded) {
    return <HeaderNotAuth />;
  }
  return <HeaderSkeleton />;
}

export default HeaderContent;
