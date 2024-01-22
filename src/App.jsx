import { Flex } from 'antd';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators as bindActions } from 'redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import { ArticlesPage } from './app/pages';
import { NotFound } from './app/components/ui';
import { authActions } from './app/store/reducers/auth';
import { ArticleSwitcher } from './app/hoc';
import { Header, ProfileEditForm } from './app/components/features';
import PrivateRoute from './routes/PrivateRoute';
import { LoginRoutes } from './routes';

// TODO Перейти на Router-v6

// TODO Настроить Приватный route
// TODO Реализовать PopUp при ошибке в форме в ответе сервера
// TODO Добавлять ошибку в ошибки полей

function App({ checkAuth }) {
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Header />
      <Flex justify="center">
        <Switch>
          <Route path="/" exact component={ArticlesPage} />
          <Route path="/login" component={LoginRoutes} />
          <Route path="/articles/:slug?" component={ArticleSwitcher} />
          <PrivateRoute path="/profile" component={ProfileEditForm} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />;
        </Switch>
      </Flex>
    </>
  );
}

const mapState = (state) => ({
  // isArticlesLoading: articleSelectors.isLoading(state),
});

const mapDispatch = (dispatch) => {
  const authAct = bindActions(authActions, dispatch);
  return { ...authAct };
};

export default connect(mapState, mapDispatch)(App);
