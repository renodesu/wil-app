import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Card, Container, Button, Alert } from "react-bootstrap";
//import Register from "./Register";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setFormError("");
      setSubmitting(true);
      await login(email, password);
      history.push('/');
    } catch {
      setFormError("* Failed to create an account! *");
    }
    setSubmitting(false);
  }

  // Login Front-end part ###################################################################################################################################################
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              {formError && <Alert variant="danger">{formError}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="loginForm">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail address"
                  />
                </Form.Group>
                <Form.Group className="loginForm">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </Form.Group>

                <Button type="submit" className="w-100" disabled={submitting}>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <p>Not a member? </p>
            <Link to="/register">Sign up now!</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
