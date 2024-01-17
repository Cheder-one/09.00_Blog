/** @jsxImportSource @emotion/react */
import { Row } from 'antd';
import { css, jsx } from '@emotion/react';

import _ from './Article.module.scss';
import PostedMeta from './PostedMeta';
import HeaderMeta from './HeaderMeta';

// article: {
//   slug: '11-df7ech',
//   title: '11',
//   description: '11',
//   body: '1111',
//   createdAt: '2024-01-15T16:10:00.919Z',
//   updatedAt: '2024-01-16T19:28:17.288Z',
//   tagList: ['11'],
//   favorited: false,
//   favoritesCount: 2,
//   author: {
//     username: 'dikayaulitka123',
//     image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
//     following: false,
//   },
// },

function Article({ article }) {
  console.log(article);
  return (
    <div className={_.article_card}>
      <Row className={_.header} css={{ flexWrap: 'nowrap' }}>
        <HeaderMeta
          slug={article.slug}
          title={article.title}
          hearts={article.favoritesCount}
          tagList={article.tagList}
        />
        {/* <Col span={18}> */}
        <PostedMeta
          date={article.createdAt}
          image={article.author.image}
          username={article.author.username}
        />
        {/* </Col> */}
      </Row>
      <Row className={_.description}>
        <div className={_.text}>{article.description}</div>
      </Row>
    </div>
  );
}

export default Article;
