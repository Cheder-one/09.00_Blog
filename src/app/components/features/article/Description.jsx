import { Tooltip, Typography } from 'antd';
import { useState } from 'react';

import _ from './Article.module.scss';

function Description({ description, full }) {
  const [isTooltip, setIsTooltip] = useState(false);

  return (
    <Tooltip
      trigger={isTooltip && 'hover'}
      title={description}
      mouseEnterDelay={0.8}
    >
      <Typography.Paragraph
        className={_[`text${full}`]}
        ellipsis={{
          rows: 3,
          onEllipsis: () => setIsTooltip(true),
        }}
      >
        {description}
      </Typography.Paragraph>
    </Tooltip>
  );
}

export default Description;
