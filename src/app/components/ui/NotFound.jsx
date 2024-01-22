import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found-page">
      <Result
        status="404"
        title="404"
        subTitle="Извините, запрашиваемая страница не найдена."
        extra={
          <Link to="/">
            <Button type="primary">На главную</Button>
          </Link>
        }
      />
    </div>
  );
}

export default NotFound;
