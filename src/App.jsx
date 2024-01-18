import { Flex } from 'antd';
import { Route, Switch } from 'react-router-dom';

import { Header, NotFound } from './app/components/ui';
import { ArticlesPage } from './app/pages';
import { ArticleSwitcher, LoginSwitcher } from './app/hoc';

function App() {
  // TODO Реализовать Skeleton || Loader

  return (
    <>
      <Header logoTitle="Realworld Blog" />
      <Flex justify="center">
        <Switch>
          <Route path="/articles/:slug?" component={ArticleSwitcher} />
          <Route path="/:loginType" component={LoginSwitcher} />

          <Route path="/" exact component={ArticlesPage} />
          <Route component={NotFound} />
        </Switch>
      </Flex>
    </>
  );
}

export default App;
