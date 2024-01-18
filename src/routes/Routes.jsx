import { Switch, Route } from 'react-router-dom';

import { ArticlesPage } from '../app/pages';
import NotFound from '../app/components/ui/NotFound';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={ArticlesPage} />
      <Route path="/articles" exact component={ArticlesPage} />

      {/* <Route path="/about" component={About} /> */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
