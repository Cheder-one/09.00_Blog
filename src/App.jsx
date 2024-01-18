import { Flex } from 'antd';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';

import { Header, NotFound } from './app/components';
import { DynamicArticleRender } from './app/hoc';
import { ArticlesPage } from './app/pages';

function App() {
  // TODO Реализовать Skeleton || Loader

  return (
    <>
      <Header logoTitle="Realworld Blog" />
      <Flex justify="center">
        <Switch>
          <Route path="/articles/:slug?" component={DynamicArticleRender} />
          <Route path="/" exact component={ArticlesPage} />
          <Route component={NotFound} />
        </Switch>
      </Flex>
    </>
  );
}

export default App;
