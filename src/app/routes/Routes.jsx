import { Switch, Route } from 'react-router-dom';

import { ArticlesPage } from '../pages';
import { NotFound } from '../components/common';

function Routes() {
  return (
    <Switch>
      <Route path="/articles" exact component={ArticlesPage} />
      {/* <Route path="/about" component={About} /> */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
