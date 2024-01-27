import { connect } from 'react-redux';
import { Col, Row, Button, Popconfirm } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { bindActionCreators as bindActions } from 'redux';
import { toast } from 'react-toastify';

import { articleActions } from '../../../store/reducers/articles';
import { authSelectors } from '../../../store/reducers/auth';

import _ from './Article.module.scss';

function BtnActions({ author, username, isFull, deleteArticle }) {
  const { slug } = useParams();
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/articles/${slug}/edit`);
  };

  const handleDelete = () => {
    deleteArticle(slug)
      .then(() => history.push('/'))
      .catch((err) => toast.error(err.info));
  };

  return (
    isFull &&
    author === username && (
      <Col className={_.article_actions_col}>
        <Row className={_.actions_row}>
          <Popconfirm
            description="Are you sure to delete this article?"
            okText="Yes"
            cancelText="No"
            placement="right"
            onConfirm={handleDelete}
          >
            <Button className={_.delete_btn} htmlType="button">
              Delete
            </Button>
          </Popconfirm>
          <Button className={_.edit_btn} htmlType="button" onClick={handleEdit}>
            Edit
          </Button>
        </Row>
      </Col>
    )
  );
}

const mapState = (state) => ({
  username: authSelectors.getUser(state)?.username,
});

const mapDispatch = (dispatch) => {
  const articleAct = bindActions(articleActions, dispatch);
  return { ...articleAct };
};

export default connect(mapState, mapDispatch)(BtnActions);
