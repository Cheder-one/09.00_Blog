import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bindActionCreators as bindActions } from 'redux';
import { connect } from 'react-redux';

import Article from '../Article';
import {
  articleActions,
  articleSelectors,
} from '../../../../store/reducers/articles';
import {
  errorsActions,
  errorsSelectors,
} from '../../../../store/reducers/errors';
import { ArticleSkeleton } from '../../../ui';
import { useNotFound } from '../../../../../hooks';

function FullArticle({ articleOne, isLoadingOne, setArticleOne, errors }) {
  const { slug } = useParams();

  useEffect(() => {
    setArticleOne(slug);
  }, []);

  useNotFound(errors.articles);

  return !isLoadingOne ? (
    <div>
      <Article
        key={articleOne?.slug}
        article={articleOne}
        errors={errors}
        isFull
      />
    </div>
  ) : (
    <ArticleSkeleton />
  );
}

const mapState = (state) => ({
  articleOne: articleSelectors.getOne(state),
  errors: errorsSelectors.getError(state),
  isLoadingOne: articleSelectors.isLoadingOne(state),
});

const mapDispatch = (dispatch) => {
  const articleAct = bindActions(articleActions, dispatch);
  const errorActs = bindActions(errorsActions, dispatch);
  return { ...articleAct, ...errorActs };
};

export default connect(mapState, mapDispatch)(FullArticle);
