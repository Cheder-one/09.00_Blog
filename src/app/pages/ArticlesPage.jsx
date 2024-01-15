import { Pagination } from '../components';
import { ArticleList } from '../components/features';

const articles = [];

// eslint-disable-next-line
for (let i = 0; i < 5; i++) {
  articles.push({
    id: i,
    title: 'Some article title',
    hearts: 12,
  });
}

function ArticlesPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ArticleList {...{ articles }} />
      <Pagination itemsCount={articles.length} />
    </div>
  );
}

export default ArticlesPage;
