import { Flex } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Header, NotFound } from './app/components/ui';
import { ArticlesPage } from './app/pages';
import { ArticleSwitcher, LoginSwitcher } from './app/hoc';
import { authActions } from './app/store/reducers/auth';

const { checkAuth } = authActions;

function App() {
  const dispatch = useDispatch();
  // TODO Реализовать Skeleton || Loader
  // TODO Перейти на Router-v6

  /**
   // TODO Сохранять JWT в localStorage при получении
   // TODO При загрузке проверять JWT
   Если токен действителен, разрешите доступ к закрытым страницам. 
   Если токен отсутствует или недействителен, перенаправьте на авторизацию.
   // TODO Удалять JWT из localStorage при log-out
   
   */

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

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
