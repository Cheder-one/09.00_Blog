import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';

import heart from '../../../assets/heart.svg';
import avatar from '../../../assets/avatar.png';
import { LinkAs } from '../../common';

import _ from './Article.module.scss';

function Article({ id, title, hearts }) {
  return (
    <div className={_.article_card}>
      <Row className={_.header}>
        <Col className={_.article_meta}>
          <Row>
            <Link to={`article/${'id'}`} className={_.title}>
              Some article title
            </Link>
            <button type="button" className={_.hearts}>
              <img src={heart} alt="heart" />
              <span>12</span>
            </button>
          </Row>
          <Row className={_.tags}>
            <a href="/">Tag</a>
            <a href="/">Tag</a>
            <a href="/">Tag</a>
          </Row>
        </Col>
        <LinkAs as={Row} className={_.author} to="/profile">
          <Col className={_.posted_meta}>
            <div className={_.name}>John Doe</div>
            <div className={_.date}>March 5, 2020</div>
          </Col>
          <Col>
            <img src={avatar} alt="profile" width={46} />
          </Col>
        </LinkAs>
      </Row>

      <Row className={_.body}>
        <div className={_.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
      </Row>
    </div>
  );
}

export default Article;
