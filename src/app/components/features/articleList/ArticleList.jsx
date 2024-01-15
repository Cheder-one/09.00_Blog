import Article from '../article/Article';

function ArticleList({ articles, className }) {
  return (
    <div className={className}>
      {articles.map((item) => (
        <Article key={item.id} title={item.title} hearts={item.hearts} />
      ))}
    </div>
  );
}

export default ArticleList;
