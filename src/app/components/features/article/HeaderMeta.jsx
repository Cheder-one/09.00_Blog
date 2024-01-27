import { nanoid } from 'nanoid';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Col, Row, Tooltip } from 'antd';
import { bindActionCreators as bindActions } from 'redux';
import { useState } from 'react';

import heart from '../../../assets/heart.svg';
import heartRed from '../../../assets/heart_red.svg';
import { articleActions } from '../../../store/reducers/articles';

import _ from './Article.module.scss';

function HeaderMeta({
  slug,
  title,
  hearts,
  tagList,
  likeArticle,
  isLiked,
  isFull,
}) {
  const toggleLikeClick = () => {
    likeArticle(slug, isLiked) // prettier-ignore
      .catch((err) => toast.error(err.info));
  };

  return (
    <Col className={_.header_meta}>
      <Row className={_.title_row}>
        <Tooltip
          title={title}
          arrow={false}
          trigger="hover"
          mouseEnterDelay={0.8}
        >
          <Link to={isFull && `/articles/${slug}`} className={_.title}>
            {title}
          </Link>
        </Tooltip>
        <button type="button" className={_.hearts} onClick={toggleLikeClick}>
          <img src={isLiked ? heartRed : heart} alt="heart" />
          <span>{hearts}</span>
        </button>
      </Row>

      <Row className={_.tag_list}>
        {tagList.map((tag) => {
          const tagTrim = tag?.trim();
          return (
            tagTrim?.length > 0 && (
              // <Link to="/" key={nanoid()}>
              <span key={nanoid()}>{tagTrim}</span>
              // </Link>
            )
          );
        })}
      </Row>
    </Col>
  );
}

const mapDispatch = (dispatch) => {
  const articleAct = bindActions(articleActions, dispatch);
  return { ...articleAct };
};

export default connect(null, mapDispatch)(HeaderMeta);
