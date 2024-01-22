import { Flex, Spin } from 'antd';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

function Loader({ css }) {
  const StyledLoader = styled(Flex)`
    height: 100vh;
    width: 100%;
    position: fixed;
    z-index: 100;
    background-color: #ebeef3;
    ${css}
  `;

  return (
    <StyledLoader justify="center" align="center">
      <Spin size="large" />
    </StyledLoader>
  );
}

Loader.propTypes = {
  css: PropTypes.string,
};
Loader.defaultProps = {
  css: '',
};

export default Loader;
