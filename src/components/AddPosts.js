import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

import Header from "../components/Header";
import Footer from "../components/Footer";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import firebase from "../firebase";
import "firebase/firestore";
import { TextareaAutosize } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddPosts() {
  const classes = useStyles();

  const { currentUser } = useAuth();

  const [submitting, setSubmitting] = useState(false);

  // Reg input state vars
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // Add data to firestore
    firebase
      .firestore()
      .collection("postdb")
      .add({
        title: title,
        content: content,
        creator: currentUser.email,
        date: new Date().toUTCString(),
        verified: false,
        disapproved: false,
      })
      .then(() => {
        setTitle("");
        setContent("");
      });

    if (title == "" || content == "") {
      return setFormError("* Please fill in required fields *");
    } else {
      setFormError("");
    }

    try {
      setFormError("");
      setFormSuccess(
        "Advertisement successfully added! It will be displayed after being verified by Admin"
      );
      setSubmitting(true);
    } catch {
      setFormError("* Failed to submit a post! *");
      setFormSuccess("");
    }
    setSubmitting(false);
  }

  return (
    <Container maxWidth="lg">
        <Header />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add your post
          </Typography>
          {formError && <Alert variant="danger">{formError}</Alert>}
          {formSuccess && <Alert variant="success">{formSuccess}</Alert>}
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              autoFocus
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextareaAutosize
              rowsMin={4}
              required
              aria-label="Content"
              id="content"
              name="content"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={submitting}
            >
              Submit
            </Button>
          </form>
        </div>
      </Container>
      <Footer />
    </Container>
  );
}
