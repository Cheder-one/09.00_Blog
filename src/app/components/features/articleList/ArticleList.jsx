import { times } from 'lodash';
import PropTypes from 'prop-types';

import { ArticleSkeleton } from '../../ui';
import Article from '../article/Article';

function ArticleList({ articles, isLoading, pageSize }) {
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

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      body: PropTypes.string,
      tagList: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  isLoading: PropTypes.bool.isRequired,
  pageSize: PropTypes.number.isRequired,
};

ArticleList.defaultProps = {
  articles: [
    {
      slug: '',
      title: '',
      description: '',
      body: '',
      tagList: [],
    },
  ],
};

export default ArticleList;
