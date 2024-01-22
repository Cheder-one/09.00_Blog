/** @jsxImportSource @emotion/react */
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { useScrollToElement } from '../../../hooks';

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function NotFound() {
  useScrollToElement('not-found', 'instant');

  return (
    <Wrapper id="not-found">
      <Result
        status="404"
        title={<h2 css={{ fontFamily: 'monospace' }}>404</h2>}
        subTitle="Запрашиваемая страница не найдена."
        extra={
          <Link to="/">
            <Button type="primary">На главную</Button>
          </Link>
        }
      />
    </Wrapper>
  );
}

export default NotFound;
