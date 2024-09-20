import NewsArticle from "./NewsArticle";

function NewsFeed(props) {
  const { articles } = props;
  console.log(articles);

  return (
    <div>
      {articles.map((article, index) => (
        <NewsArticle key={JSON.stringify(article)} {...article} />
      ))}
    </div>
  );
}

export default NewsFeed;
