import { useParams } from 'react-router-dom';

import FullArticle from '../components/features/article/fullArticle/FullArticle';
import { Article } from '../components/features';

function DynamicArticleRender() {
  const { slug } = useParams();

  return slug ? <FullArticle slug={slug} /> : <Article />;
}

export default DynamicArticleRender;
