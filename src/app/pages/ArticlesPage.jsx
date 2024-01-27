import { Col } from 'antd';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators as bindActions } from 'redux';
import { toast } from 'react-toastify';

import { Pagination } from '../components/ui';
import { getPaginateParams } from '../../utils';
import { ArticleList } from '../components/features';
import { errorsActions } from '../store/reducers/errors';
import { paginationSelectors } from '../store/reducers/pagination';
import { articleActions, articleSelectors } from '../store/reducers/articles';
import { useScrollTop } from '../../hooks';

function ArticlesPage({
  articlesChunk,
  pagination,
  isLoading,
  setArticlesChunk,
}) {
  useScrollTop();
  const { articles, articlesCount } = articlesChunk;

  useEffect(() => {
    const params = getPaginateParams({ pagination });
    setArticlesChunk(params) // prettier-ignore
      .catch((err) => toast.error(err.info));
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
  articleError: articleSelectors.getError(state),
  isLoading: articleSelectors.isLoading(state),
});

const mapDispatch = (dispatch) => {
  const articleAct = bindActions(articleActions, dispatch);
  const errorActs = bindActions(errorsActions, dispatch);
  return { ...articleAct, ...errorActs };
};

export default connect(mapState, mapDispatch)(ArticlesPage);
