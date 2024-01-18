import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { Col, Row, Tooltip } from 'antd';

import heart from '../../../../assets/heart.svg';

import _ from './Article.module.scss';

function HeaderMeta({ slug, title, hearts, tagList, isFull }) {
  return (
    <Col className={_.header_meta}>
      <Row className={_.title_row}>
        <Tooltip
          title={title}
          arrow={false}
          trigger="hover"
          mouseEnterDelay={0.5}
        >
          <Link to={isFull && `/articles/${slug}`} className={_.title}>
            {title}
          </Link>
        </Tooltip>
        <button type="button" className={_.hearts}>
          <img src={heart} alt="heart" />
          <span>{hearts}</span>
        </button>
      </Row>

      <Row className={_.tags}>
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

export default HeaderMeta;
