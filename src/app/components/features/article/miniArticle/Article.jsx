import { Row } from 'antd';
/** @jsxImportSource @emotion/react */
import Markdown from 'markdown-to-jsx';

import { removeInvisibleChar } from '../../../../../utils';

import _ from './Article.module.scss';
import PostedMeta from './PostedMeta';
import HeaderMeta from './HeaderMeta';

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
          isFull
        />
        <PostedMeta
          date={article.createdAt}
          image={article.author.image}
          username={article.author.username}
        />
      </Row>
      <Row className={_.description}>
        <div className={_[`text${full}`]}>{article.description}</div>
      </Row>

      {isFull && article.body ? (
        <Markdown className={_.body}>
          {removeInvisibleChar(article.body).trim()}
        </Markdown>
      ) : null}
    </article>
  );
}

export default Article;
