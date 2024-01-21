import { Col, Row, Image } from 'antd';
import { Link } from 'react-router-dom';

import { formatDate } from '../../../../../utils';
import smileSrc from '../../../../assets/smiley-cyrus.jpg';

import _ from './Article.module.scss';

function PostedMeta({ date, image, username }) {
  return (
    <Row className={_.author}>
      <Col className={_.posted_meta}>
        <Link to={`/profiles/:${username}`} className={_.name}>
          {username}
        </Link>
        <div className={_.date}>{formatDate(date)}</div>
      </Col>

      <Col>
        <Link to={`/profiles/:${username}`}>
          <Image
            src={image}
            alt="profile"
            preview={false}
            className={_.photo}
            fallback={smileSrc}
          />
        </Link>
      </Col>
    </Row>
  );
}

export default PostedMeta;
