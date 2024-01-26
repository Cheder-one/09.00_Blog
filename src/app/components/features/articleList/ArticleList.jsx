import { times } from 'lodash';

import { ArticleSkeleton } from '../../ui';
import Article from '../article/Article';

function ArticleList({ articles, isLoading, pageSize, errors }) {
  return (
    <div>
      {!isLoading
        ? articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))
        : times(pageSize, (i) => <ArticleSkeleton key={i} />)}
    </div>
  );
}

export default ArticleList;
