import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const [submitting, setSubmitting] = useState(false);

  // Reg input state vars
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setComfirmPassword] = useState('');

  const { signup } = useAuth();
  const [formError, setFormError] = useState('');

  // Error state vars
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cpasswordError, setcPasswordError] = useState('');

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
      age == "" ||
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

    // Age val
    if (!/\d+/.test(age)) {
      return setAgeError("* Age is just a number *");
    } else {
      setAgeError("");
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
      return setFormError("* Passwords do not match! *");
    } else {
      setFormError("");
    }

    try {
      setFormError("");
      setSubmitting(true);
      await signup(firstname, lastname, age, email, password);
      history.push('/login');
    } catch {
      setFormError("* Failed to create an account! *");
    }
    setSubmitting(false);
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign up</h2>
              {formError && <Alert variant="danger">{formError}</Alert>}
              <Form onSubmit={handleSubmit}>
                {/* Reg form First name */}
                <Form.Group className="regForm">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="firstname"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                  />
                </Form.Group>
                {firstNameError && (
                  <Alert variant="warning">{firstNameError}</Alert>
                )}

                {/* Reg form Last name */}
                <Form.Group className="regForm">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="lastname"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                  />
                </Form.Group>
                {lastNameError && (
                  <Alert variant="warning">{lastNameError}</Alert>
                )}

                {/* Reg form gender */}
                <Form.Group className="regForm">
                  <Form.Label>Gender</Form.Label>
                  <div>
                    <select name="gender">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </Form.Group>

                {/* Reg form age */}
                <Form.Group className="regForm">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    name="age *"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Age"
                  />
                </Form.Group>
                {ageError && <Alert variant="warning">{ageError}</Alert>}

                {/* Reg form email */}
                <Form.Group className="regForm">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail address"
                  />
                </Form.Group>
                {emailError && <Alert variant="warning">{emailError}</Alert>}

                {/* Reg form password */}
                <Form.Group className="regForm">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </Form.Group>
                {passwordError && (
                  <Alert variant="warning">{passwordError}</Alert>
                )}

                {/* Reg form confirm password */}
                <Form.Group className="regForm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    name="confirmpassword"
                    type="password"
                    autoComplete="off"
                    value={confirmpassword}
                    onChange={(e) => setComfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                  />
                </Form.Group>
                {cpasswordError && (
                  <Alert variant="warning">{cpasswordError}</Alert>
                )}

                {/* Reg form term of use */}
                <Form.Group className="regForm">
                  <Form.Label>Term of use</Form.Label>
                  <Form.Control
                    type="checkbox"
                    name="terms"
                    id="terms"
                    required
                  />
                </Form.Group>

                <Button type="submit" className="w-100" disabled={submitting}>
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <p>Already a member? </p>
            <Link to="/login">Log In now!</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
