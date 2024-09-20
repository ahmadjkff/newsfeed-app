import { Container } from "@mui/material";
import NewsHeader from "./components/NewsHeader";
import NewsFeed from "./components/NewsFeed";
import { useEffect, useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);

  async function loadData() {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${
        import.meta.env.VITE_NEWS_FEED_API_KEY
      }`
    );

    const data = await response.json();

    return data.articles.map((article) => {
      const { title, description, author, publishedAt, urlToImage } = article;
      return { title, description, author, publishedAt, image: urlToImage };
    });
  }

  useEffect(() => {
    loadData().then(setArticles);
    // loadData().then((data) => setArticles(data));
  }, []);

  return (
    <Container>
      <NewsHeader />
      <NewsFeed articles={articles} />
    </Container>
  );
}

export default App;
