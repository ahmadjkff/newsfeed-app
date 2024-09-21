import { Button, Container, styled, Typography } from "@mui/material";
import NewsHeader from "./components/NewsHeader";
import NewsFeed from "./components/NewsFeed";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

const Footer = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 0),
  display: "flex",
  justifyContent: "space-between",
}));

const PAGE_SIZE = 5;

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const pageNumber = useRef(1);
  const queryValue = useRef("");

  async function loadData() {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?q=${queryValue.current}&page=${
        pageNumber.current
      }&pageSize=${PAGE_SIZE}&country=us&apiKey=${
        import.meta.env.VITE_NEWS_FEED_API_KEY
      }`
    );

    const data = await response.json();
    if (data.status === "error") {
      throw new Error("an error has occured");
    }
    return data.articles.map((article) => {
      const { title, description, author, publishedAt, urlToImage } = article;
      return { title, description, author, publishedAt, image: urlToImage };
    });
  }

  const fetchAndUpdateArticles = () => {
    setLoading(true);
    setError("");
    loadData()
      .then((newData) => {
        setArticles(newData);
      })
      .catch((errorMessage) => {
        setError(errorMessage.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const debouncedLoadData = debounce(() => fetchAndUpdateArticles(), 500);

  useEffect(() => {
    fetchAndUpdateArticles();
    // loadData().then((data) => setArticles(data));
  }, []);

  const handleSearchChange = (newQuery) => {
    pageNumber.current = 1;
    queryValue.current = newQuery;
    debouncedLoadData();
  };

  const handlePreviousClick = () => {
    pageNumber.current -= 1;
    fetchAndUpdateArticles();
  };

  const handleNextClick = () => {
    pageNumber.current += 1;
    fetchAndUpdateArticles();
  };

  return (
    <Container>
      <NewsHeader onSearchChange={handleSearchChange} />
      {error.length === 0 ? (
        <NewsFeed articles={articles} loading={loading} />
      ) : (
        <Typography color="error" align="center" marginTop={7} fontWeight={900}>
          {error}
        </Typography>
      )}
      <Footer>
        <Button
          variant="outlined"
          onClick={handlePreviousClick}
          disabled={pageNumber.current === 1}
        >
          previous
        </Button>
        <Button
          variant="outlined"
          onClick={handleNextClick}
          disabled={articles.length < PAGE_SIZE}
        >
          Next
        </Button>
      </Footer>
    </Container>
  );
}

export default App;
