import { Flex } from 'antd';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Route, Switch, Redirect } from 'react-router-dom';
import { bindActionCreators as bindActions } from 'redux';

import { ArticlesPage } from './app/pages';
import { NotFound } from './app/components/ui';
import { LoginRoutes, PrivateRoute } from './routes';
import { authActions } from './app/store/reducers/auth';
import {
  Header,
  ArticleForm,
  ProfileEditForm,
} from './app/components/features';
import ArticleRoutes from './routes/ArticleRoutes';

// TODO Перейти на Router-v6
// NOTE Удалить данные входа

// TODO Реализовать Like
// TODO Добавить PropTypes

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
          <Route path="/articles" component={ArticleRoutes} />
          <PrivateRoute path="/new-article" component={ArticleForm} />
          <PrivateRoute path="/profile" component={ProfileEditForm} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />;
        </Switch>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </Flex>
    </>
  );
}

const mapState = (state) => ({
  //
});

const mapDispatch = (dispatch) => {
  const authAct = bindActions(authActions, dispatch);
  return { ...authAct };
};

export default connect(mapState, mapDispatch)(App);
