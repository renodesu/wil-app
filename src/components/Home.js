import React from "react";
import { Button, Card } from "react-bootstrap";
import { useAuth } from '../contexts/AuthContext';
export default function Home() {
//   const [error, setError] = useState("");
  const { currentUser } = useAuth();

  function handleLogout() {}

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Home</h2>
          {/* {error && <Alert variant="danger">{error}</Alert>} */}
          <strong>Email: </strong> {currentUser.displayname}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
}
