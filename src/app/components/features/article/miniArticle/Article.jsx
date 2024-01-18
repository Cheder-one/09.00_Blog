import { Row } from 'antd';
import Markdown from 'markdown-to-jsx';

import { removeInvisibleChar } from '../../../../utils';

import _ from './Article.module.scss';
import PostedMeta from './PostedMeta';
import HeaderMeta from './HeaderMeta';

function Article({ article, isFull }) {
  return (
    <article className={_.article_card}>
      <Row className={_.header}>
        <HeaderMeta
          slug={article.slug}
          title={article.title}
          hearts={article.favoritesCount}
          tagList={article.tagList}
        />
        <PostedMeta
          date={article.createdAt}
          image={article.author.image}
          username={article.author.username}
        />
      </Row>
      <Row className={_.description}>
        <div className={_.text}>{article.description}</div>
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
