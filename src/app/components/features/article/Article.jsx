import { Row } from 'antd';
import Markdown from 'markdown-to-jsx';
import { PropTypes } from 'prop-types';

import { removeInvisibleChar } from '../../../../utils';

import _ from './Article.module.scss';
import PostedMeta from './PostedMeta';
import HeaderMeta from './HeaderMeta';
import Description from './Description';
import BtnActions from './BtnActions';

function Article({ article, isFull }) {
  const full = isFull ? '--full' : '';

  return (
    <article className={_[`article_card${full}`]}>
      <Row className={_.header}>
        <HeaderMeta
          slug={article.slug}
          title={article.title}
          hearts={article.favoritesCount}
          tagList={article.tagList}
          isLiked={article.favorited}
          isFull
        />
        <PostedMeta
          date={article.createdAt}
          image={article.author.image}
          username={article.author.username}
        />
      </Row>
      <Row className={_[`description${full}`]}>
        <Description description={article.description} full={full} />
        <BtnActions author={article.author.username} isFull={isFull} />
      </Row>

      {isFull && article.body && (
        <Markdown className={_.body}>
          {removeInvisibleChar(article.body).trim()}
        </Markdown>
      )}
    </article>
  );
}

Article.propTypes = {
  article: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string,
    favorited: PropTypes.bool.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
      image: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    body: PropTypes.string,
  }).isRequired,
  isFull: PropTypes.bool,
};

Article.defaultProps = {
  isFull: false,
};

export default Article;
