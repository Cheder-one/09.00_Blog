import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bindActionCreators as bindActions } from 'redux';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

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
      <Article
        key={articleOne?.slug}
        article={articleOne}
        errors={articleError}
        isFull
      />
    </div>
  ) : (
    <ArticleSkeleton />
  );
}

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
