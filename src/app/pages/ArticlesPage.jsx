import { Col } from 'antd';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators as bindActions } from 'redux';
import { Redirect } from 'react-router-dom';

import { Pagination } from '../components/ui';
import { getPaginateParams } from '../../utils';
import { ArticleList } from '../components/features';
import { errorsActions, errorsSelectors } from '../store/reducers/errors';
import { paginationSelectors } from '../store/reducers/pagination';
import { articleActions, articleSelectors } from '../store/reducers/articles';
import { useScrollTop } from '../../hooks';

function ArticlesPage({
  articlesChunk,
  pagination,
  errors,
  clearErrors,
  isLoading,
  setArticlesChunk,
}) {
  useScrollTop();
  const { articles, articlesCount } = articlesChunk;

  useEffect(() => {
    const params = getPaginateParams({ pagination });
    setArticlesChunk(params);
  }, [pagination]);

  return (
    <Col>
      <ArticleList
        articles={articles}
        isLoading={isLoading}
        pageSize={pagination.pageSize}
      />
      <Pagination itemsCount={articlesCount} />
    </Col>
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
  const errorActs = bindActions(errorsActions, dispatch);
  return { ...articleAct, ...errorActs };
};

export default connect(mapState, mapDispatch)(ArticlesPage);
