/** @jsxImportSource @emotion/react */
import PropTypes from 'prop-types';
import { jsx } from '@emotion/react';
import { Pagination as Paginate, Flex } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators as bindActions } from 'redux';

import { getPagination, paginationActions } from '../store/reducers/pagination';

function Pagination({ itemsCount }) {
  const { currentPage, pageSize } = useSelector(getPagination());
  const paginateAct = bindActions(paginationActions, useDispatch());

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
          pageSizeOptions={['5', '10', '20', '50', '100']}
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

export default Pagination;
