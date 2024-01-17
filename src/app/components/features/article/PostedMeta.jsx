import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';

import _ from './Article.module.scss';

function PostedMeta({ date, image, username }) {
  return (
    <Row className={_.author}>
      <Col className={_.posted_meta}>
        <Link to={`/profiles/${username}`} className={_.name}>
          {username}
        </Link>
        <div className={_.date}>{date}</div>
      </Col>

      <Col>
        <Link to={`/profiles/${username}`}>
          <img src={image} alt="profile" className={_.photo} />
        </Link>
      </Col>
    </Row>
  );
}

export default PostedMeta;
