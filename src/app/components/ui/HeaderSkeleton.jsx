/** @jsxImportSource @emotion/react */
import { Skeleton } from 'antd';

function HeaderSkeleton() {
  return (
    <div css={{ display: 'flex', gap: '15px' }}>
      <Skeleton.Input active />
      <Skeleton.Avatar active size="large" />
      <div css={{ width: '110px' }}>
        <Skeleton.Button active size="large" block />
      </div>
    </div>
  );
}

export default HeaderSkeleton;
