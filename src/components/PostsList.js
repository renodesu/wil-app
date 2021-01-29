import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

function usePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("postdb")
      .where("verified", "==", true)
      .onSnapshot((snapshot) => {
        const newPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(newPosts);
      });
    return () => unsubscribe();
  }, []);
  return posts;
}

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

const PostsList = () => {
  const posts = usePosts();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h4">
        Advertisement
      </Typography>
      <div>
        <Link to="/addposts">Want to advertise? Add yours here!</Link>
      </div>
      <Grid item xs={12} md={12}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            {posts.map((post) => (
              <CardContent key={post.id}>
                <Typography component="h2" variant="h5">
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Posted by <i>{post.creator}</i>
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {post.content}
                </Typography>
              </CardContent>
            ))}
          </div>
        </Card>
      </Grid>
    </div>
  );
};

export default PostsList;
