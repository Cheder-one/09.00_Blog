import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';

import heart from '../../../assets/heart.svg';

import _ from './Article.module.scss';

function HeaderMeta({ slug, title, hearts, tagList }) {
  return (
    <Col className={_.header_meta}>
      <Row className={_.title_row}>
        <Link to={`article/${slug}`} className={_.title}>
          {title}
        </Link>
        <button type="button" className={_.hearts}>
          <img src={heart} alt="heart" />
          <span>{hearts}</span>
        </button>
      </Row>

      <Row className={_.tags}>
        {tagList.map((tag) => {
          return (
            tag && (
              <Link to="/" key={nanoid()}>
                <span>{tag.trim()}</span>
              </Link>
            )
          );
        })}
      </Row>
    </Col>
  );
}

export default HeaderMeta;
