import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";

function Manage() {
  const [posts, setPosts] = useState([]);
  const db = firebase.firestore();
  const history = useHistory();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db
        .collection("postdb")
        .where("verified", "==", false)
        .get();
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  if (currentUser.email != "admin@admin.com") {
    alert("Unauthorized access not allowed!");
    history.push("/");
  }

  function onVerify(id) {
    db.collection("postdb").doc(id).update({
      verified: true,
    });
    history.go();
  }

  function onDisapprove(id) {
    db.collection("postdb").doc(id).update({
      disapproved: true,
    });
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <List>
            <Typography variant="h4">Management</Typography>
            {posts.map((post) => (
              <ListItem key={post.id}>
                <ListItemText
                  primary={post.title}
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2">
                        {post.creator}
                      </Typography>
                      <Typography variant="subtitle2" gutterBottom>
                        Created at {post.date}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        color="textPrimary"
                      >
                        {post.content}
                      </Typography>
                    </React.Fragment>
                  }
                >
                  <Typography variant="h5" color="inherit" paragraph>
                    {post.content}
                  </Typography>
                </ListItemText>
                <Box m={0.5}>
                  <Button
                    variant="outline-primary"
                    onClick={() => onVerify(post.id)}
                  >
                    Approve
                  </Button>
                </Box>
                <Box m={0.5}>
                  <Button
                    variant="outline-danger"
                    onClick={() => onDisapprove(post.id)}
                  >
                    Disapprove
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
        </main>
      </Container>
      <Footer title="Recycling 6" description="Recycling 6 - 2021 - WIL" />
    </React.Fragment>
  );
}

export default Manage;
