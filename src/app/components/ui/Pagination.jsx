/** @jsxImportSource @emotion/react */
import PropTypes from 'prop-types';
import { jsx } from '@emotion/react';
import { connect } from 'react-redux';
import { Pagination as Paginate, Flex } from 'antd';
import { bindActionCreators as bindActions } from 'redux';

import {
  paginationActions,
  paginationSelectors,
} from '../../store/reducers/pagination';

function Pagination({ itemsCount, currentPage, pageSize, paginateAct }) {
  const handlePageChange = (page, size) => {
    paginateAct.updated(page, size);
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Flex justify="center" css={{ marginBottom: '20px' }}>
      {itemsCount > pageSize ? (
        <Paginate
          total={itemsCount}
          current={currentPage}
          pageSize={pageSize}
          defaultCurrent={1}
          showQuickJumper
          pageSizeOptions={['5', '10', '20', '50', '100', '500']}
          onChange={handlePageChange}
        />
      ) : null}
    </Flex>
  );
}

Pagination.propTypes = {
  // itemsCount: PropTypes.number.isRequired,
  // onPageChange: PropTypes.func.isRequired,
  // currPage: PropTypes.number.isRequired,
  // pageSize: PropTypes.number,
};

const mapState = (state) => ({
  currentPage: paginationSelectors.getCurrentPage(state),
  pageSize: paginationSelectors.getPageSize(state),
});

const mapDispatch = (dispatch) => {
  const paginateAct = bindActions(paginationActions, dispatch);
  return { paginateAct };
};

export default connect(mapState, mapDispatch)(Pagination);
