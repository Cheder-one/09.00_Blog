import { Col } from 'antd';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { bindActionCreators as bindActions } from 'redux';

import { useScrollTop } from '../../hooks';
import { Pagination } from '../components/ui';
import { ArticleList } from '../components/features';
import { errorsActions } from '../store/reducers/errors';
import { paginationSelectors } from '../store/reducers/pagination';
import { articleActions, articleSelectors } from '../store/reducers/articles';

function ArticlesPage({
  articlesChunk,
  pagination,
  isLoading,
  setArticlesChunk,
}) {
  const { articles, articlesCount } = articlesChunk;
  useScrollTop();

  useEffect(() => {
    setArticlesChunk() // prettier-ignore
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

ArticlesPage.propTypes = {
  articlesChunk: PropTypes.shape({
    articles: PropTypes.arrayOf(
      PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        body: PropTypes.string,
        tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        favorited: PropTypes.bool.isRequired,
        favoritesCount: PropTypes.number.isRequired,
        author: PropTypes.shape({
          username: PropTypes.string.isRequired,
          bio: PropTypes.string,
          image: PropTypes.string.isRequired,
          following: PropTypes.bool.isRequired,
        }).isRequired,
      })
    ),
    articlesCount: PropTypes.number,
  }).isRequired,
  pagination: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  setArticlesChunk: PropTypes.func.isRequired,
};

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
