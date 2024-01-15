/** @jsxImportSource @emotion/react */
import PropTypes from 'prop-types';
import { jsx } from '@emotion/react';
import { Pagination as Paginate, Flex } from 'antd';

function Pagination({ itemsCount, onPageChange, currPage, pageSize }) {
  const handlePageChange = (page, size) => {
    // onPageChange(page, size);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Flex justify="center" css={{ marginBottom: '20px' }}>
      {itemsCount >= pageSize ? (
        <Paginate
          total={itemsCount}
          current={currPage || 1}
          pageSize={pageSize}
          defaultCurrent={1}
          showQuickJumper
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

Pagination.defaultProps = {
  pageSize: 5,
};

export default Pagination;
