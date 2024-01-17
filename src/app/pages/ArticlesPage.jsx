import { Col } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators as bindActions } from 'redux';

import { Pagination } from '../components';
import { ArticleList } from '../components/features';
import {
  getArticles,
  articleActions,
  getArticlesIsLoading,
} from '../store/reducers/articles';
import { getPaginateParams } from '../utils';
import { getErrors } from '../store/reducers/errors';
import { getPagination } from '../store/reducers/pagination';

function ArticlesPage() {
  const errors = useSelector(getErrors());
  const pagination = useSelector(getPagination());
  const isLoading = useSelector(getArticlesIsLoading());
  const { articles, articlesCount } = useSelector(getArticles());
  const articlesAct = bindActions(articleActions, useDispatch());

  useEffect(() => {
    const params = getPaginateParams({ pagination });
    articlesAct.chunkLoaded(params);
  }, [pagination]);

  return (
    !isLoading &&
    !errors.articles && (
      <Col>
        <ArticleList articles={articles} />
        <Pagination itemsCount={articlesCount} />
      </Col>
    )
  );
}

export default ArticlesPage;
