import { Spin } from 'antd';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

function Loader({ css }) {
  const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    position: fixed;

    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 1);
    ${css}
  `;

  return (
    <Wrapper>
      <Spin size="large" />
    </Wrapper>
  );
}

Loader.propTypes = {
  css: PropTypes.string,
};
Loader.defaultProps = {
  css: '',
};

export default Loader;
