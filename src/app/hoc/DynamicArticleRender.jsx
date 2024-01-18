import { useParams } from 'react-router-dom';

import FullArticle from '../components/features/article/fullArticle/FullArticle';
import { ArticlesPage } from '../pages';

function DynamicArticleRender() {
  const { slug } = useParams();

  return slug ? <FullArticle slug={slug} /> : <ArticlesPage />;
}

export default DynamicArticleRender;
