import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { bindActionCreators as bindActions } from 'redux';

import Article from '../Article';
import {
  articleActions,
  articleSelectors,
} from '../../../../store/reducers/articles';
import { ArticleSkeleton } from '../../../ui';
import { useNotFound } from '../../../../../hooks';
import { errorsActions } from '../../../../store/reducers/errors';

function FullArticle({
  articleOne,
  isLoadingOne,
  setArticleOne,
  articleError,
}) {
  const { slug } = useParams();

  useEffect(() => {
    setArticleOne(slug) // prettier-ignore
      .catch((err) => toast.error(err.info));
  }, []);

  useNotFound(articleError);

  return !isLoadingOne ? (
    <div>
      <Article key={articleOne?.slug} article={articleOne} isFull />
    </div>
  ) : (
    <ArticleSkeleton />
  );
}

FullArticle.propTypes = {
  articleOne: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    favorited: PropTypes.bool,
    favoritesCount: PropTypes.number,
  }),
  isLoadingOne: PropTypes.bool.isRequired,
  setArticleOne: PropTypes.func.isRequired,
  articleError: PropTypes.shape({
    status: PropTypes.number,
  }).isRequired,
};

FullArticle.defaultProps = {
  articleOne: {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
  },
};

const mapState = (state) => ({
  articleOne: articleSelectors.getOne(state),
  articleError: articleSelectors.getError(state),
  isLoadingOne: articleSelectors.isLoadingOne(state),
});

const mapDispatch = (dispatch) => {
  const articleAct = bindActions(articleActions, dispatch);
  const errorActs = bindActions(errorsActions, dispatch);
  return { ...articleAct, ...errorActs };
};

export default connect(mapState, mapDispatch)(FullArticle);
