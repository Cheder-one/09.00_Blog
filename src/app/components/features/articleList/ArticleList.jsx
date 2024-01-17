import Article from '../article/Article';

function ArticleList({ articles }) {
  return (
    <div>
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
}

export default ArticleList;
