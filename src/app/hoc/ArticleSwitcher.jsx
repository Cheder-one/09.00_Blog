import { useParams } from 'react-router-dom';

import { FullArticle } from '../components/features/article';
import { ArticlesPage } from '../pages';

function ArticleSwitcher() {
  const { slug } = useParams();

  return slug ? <FullArticle slug={slug} /> : <ArticlesPage />;
}

export default ArticleSwitcher;
