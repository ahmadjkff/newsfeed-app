import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

function NewsHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">NewsFeed App</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NewsHeader;
