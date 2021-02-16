import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import "firebase/firestore";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "fontsource-roboto";
import Footer from "../components/Footer"

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const [submitting, setSubmitting] = useState(false);

  const classes = useStyles();

  // Reg input state vars
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setComfirmPassword] = useState("");

  const { signup } = useAuth();
  const [formError, setFormError] = useState("");

  // Error state vars
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpasswordError, setcPasswordError] = useState("");
  const [checkPwError, setCheckPwError] = useState("");

  // Regex
  const pRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  const nameRegex = new RegExp("^[A-Za-z]+$");

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      firstname == "" ||
      lastname == "" ||
      email == "" ||
      password == "" ||
      confirmpassword == ""
    ) {
      return setFormError("* Please fill in required fields *");
    } else {
      setFormError("");
    }

    // First name val
    if (!nameRegex.test(firstname)) {
      return setFirstNameError(
        "* Your First name must not contain special or numeric symbols! *"
      );
    } else {
      setFirstNameError("");
    }

    // Last name val
    if (!nameRegex.test(lastname)) {
      return setLastNameError(
        "* Your Last name must not contain special or numeric symbols! *"
      );
    } else {
      setLastNameError("");
    }

    // Email val
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return setEmailError("* Invalid E-mail address format! *");
    } else {
      setEmailError("");
    }

    if (!pRegex.test(password)) {
      return setPasswordError(
        "* Your password must include at least 1 lowercase, 1 uppercase, 1 number and 1 special character and at least 8 characters* "
      );
    } else {
      setPasswordError("");
    }

    if (!pRegex.test(confirmpassword)) {
      return setcPasswordError(
        "* Your password must include at least 1 lowercase, 1 uppercase, 1 number and 1 special character and at least 8 characters* "
      );
    } else {
      setcPasswordError("");
    }

    // Check pwd and confirm pwd
    if (password !== confirmpassword) {
      return setCheckPwError("* Passwords do not match! *");
    } else {
      setCheckPwError("");
    }

    try {
      setFormError("");
      setSubmitting(true);
      // Add data to firestore
      firebase.firestore().collection("userdb").add({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      });
      await signup(firstname, lastname, email, password);
      history.push("/login"); //Redirect to Login page
    } catch {
      setFormError("* Failed to create an account! *");
    }
    setSubmitting(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {formError && <Alert variant="danger">{formError}</Alert>}
        {firstNameError && <Alert variant="warning">{firstNameError}</Alert>}
        {lastNameError && <Alert variant="warning">{lastNameError}</Alert>}
        {emailError && <Alert variant="warning">{emailError}</Alert>}
        {passwordError && <Alert variant="warning">{passwordError}</Alert>}
        {cpasswordError && <Alert variant="warning">{cpasswordError}</Alert>}
        {checkPwError && <Alert variant="warning">{checkPwError}</Alert>}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                autoComplete="off"
                value={confirmpassword}
                onChange={(e) => setComfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={submitting}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <p variant="body2">
                Already have an account? <Link to="/login">Log In now!</Link>
              </p>
            </Grid>
          </Grid>
        </form>
      </div>
      <Footer title="Recycling 6" description="Recycling 6 - 2021 - WIL" />
    </Container>
  );
}
