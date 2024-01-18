import { Col } from 'antd';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, useParams } from 'react-router-dom';
import { bindActionCreators as bindActions } from 'redux';

import { Pagination } from '../components';
import { getPaginateParams } from '../utils';
import { ArticleList } from '../components/features';
import { errorsSelectors } from '../store/reducers/errors';
import { paginationSelectors } from '../store/reducers/pagination';
import { articleActions, articleSelectors } from '../store/reducers/articles';
import FullArticle from '../components/features/article/fullArticle/FullArticle';

function ArticlesPage({
  articlesChunk,
  pagination,
  isLoading,
  errors,
  setArticlesChunk,
}) {
  const { articles, articlesCount } = articlesChunk;

  useEffect(() => {
    const params = getPaginateParams({ pagination });
    setArticlesChunk(params);
  }, [pagination]);

  return !isLoading && !errors.articles ? (
    <Col>
      <ArticleList articles={articles} />
      <Pagination itemsCount={articlesCount} />
    </Col>
  ) : (
    <h1>Loading...</h1>
  );
}

const mapState = (state) => ({
  articlesChunk: articleSelectors.getChunk(state),
  pagination: paginationSelectors.getPagination(state),
  errors: errorsSelectors.getError(state),
  isLoading: articleSelectors.isLoading(state),
});

const mapDispatch = (dispatch) => {
  const articleAct = bindActions(articleActions, dispatch);
  return { ...articleAct };
};

export default connect(mapState, mapDispatch)(ArticlesPage);
