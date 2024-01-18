import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { bindActionCreators as bindActions } from 'redux';
import { connect } from 'react-redux';

import Article from '../miniArticle/Article';
import {
  articleActions,
  articleSelectors,
} from '../../../../store/reducers/articles';
import { errorsSelectors } from '../../../../store/reducers/errors';

function FullArticle({ articleOne, isLoadingOne, setArticleOne, errors }) {
  const { slug } = useParams();

  useEffect(() => {
    setArticleOne(slug);
  }, []);

  return (
    !isLoadingOne &&
    !errors.articles && (
      <div>
        <Article key={articleOne.slug} article={articleOne} isFull />
      </div>
    )
  );
}

const mapState = (state) => ({
  articleOne: articleSelectors.getOne(state),
  errors: errorsSelectors.getError(state),
  isLoadingOne: articleSelectors.isLoadingOne(state),
});

const mapDispatch = (dispatch) => {
  const articleAct = bindActions(articleActions, dispatch);
  return { ...articleAct };
};

export default connect(mapState, mapDispatch)(FullArticle);
