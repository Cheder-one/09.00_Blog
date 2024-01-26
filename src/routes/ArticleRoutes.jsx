import { Route, Switch, Redirect } from 'react-router-dom';

import { ArticlesPage } from '../app/pages';
import { ArticleForm, FullArticle } from '../app/components/features';

function ArticleRoutes() {
  return (
    <Switch>
      <Route exact path="/articles/:slug/edit" component={ArticleForm} />
      <Route path="/articles/:slug" exact component={FullArticle} />
      <Route path="/articles" exact component={ArticlesPage} />
      <Redirect to="/404" />;
    </Switch>
  );
}

export default ArticleRoutes;
