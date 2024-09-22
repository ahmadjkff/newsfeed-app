import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { StyledCard } from "./StyledCard";
import { Box, CardMedia, Skeleton } from "@mui/material";

function LoadingArticle() {
  return (
    <StyledCard>
      <CardActionArea>
        {/* {image && (
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt="Sample article"
          />
        )} */}
        <CardContent>
          <Skeleton variant="text" sx={{ fontSize: "5rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
        </CardContent>
      </CardActionArea>
      <Box p={2}>
        <Skeleton variant="text" width={200} sx={{ fontSize: "1.5rem" }} />
        <Skeleton variant="text" width={200} sx={{ fontSize: "1.5rem" }} />
      </Box>
    </StyledCard>
  );
}

export default LoadingArticle;
