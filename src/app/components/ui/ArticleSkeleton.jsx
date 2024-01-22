/** @jsxImportSource @emotion/react */
import { Row, Col, Skeleton } from 'antd';
import styled from '@emotion/styled';
import { jsx } from '@emotion/react';

const Wrapper = styled.div`
  width: 70vw;
  margin: 26px 0;
  padding: 15px 15px 20px 15px;

  border-radius: 5px;
  background-color: #fff;
`;

function ArticleSkeleton() {
  return (
    <Wrapper>
      <Row
        align="middle"
        justify="space-between"
        css={{ marginBottom: '20px' }}
      >
        <Col>
          <Skeleton.Input />
        </Col>
        <Col css={{ display: 'flex', gap: '12px' }}>
          <Skeleton.Button />
          <Skeleton.Avatar active />
        </Col>
      </Row>
      <Skeleton active paragraph={{ rows: 2 }} />
    </Wrapper>
  );
}

export default ArticleSkeleton;
