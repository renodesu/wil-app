import React from "react";
import PostsList from "../components/PostsList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainFeaturedPost from "../components/MainFeaturePost";
import FeaturedContent from "../components/FeaturedContent";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import post1 from "../contents/post-1.md.js";
import post2 from "../contents/post-2.md.js";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const mainFeaturedPost = {
  title: "Welcome to Recycling 6",
  description:
    "Find out more about what you CAN and CAN'T recycle in your household recycling services by reading our campaign posts",
  image:
    "https://assets.sustainability.vic.gov.au/recycling-campaign/help_with_your_recycling_banner-1440x650.jpg?mtime=20190918161307&focal=none",
  imgText: "main image description",
};

const posts = [post1, post2];

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={2} className={classes.mainGrid}>
            <Grid xs="8"><FeaturedContent title="Recycling in Australia" posts={posts} /></Grid>
            <Grid xs="4"><PostsList /></Grid>
          </Grid>
        </main>
      </Container>
      <Footer title="Recycling 6" description="Recycling 6 - 2021 - WIL" />
    </React.Fragment>
  );
}
