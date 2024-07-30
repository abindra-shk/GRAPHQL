import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Link,
  Paper,
} from "@mui/material";
import { gql, useMutation } from "@apollo/client";

const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
      username
    }
  }
`;

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();
  const [registerUser, { loading }] = useMutation(REGISTER_USER);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setGeneralError("");

    try {
      const { data } = await registerUser({
        variables: { username, password },
      });

      if (data.createUser) {
        alert(`${data.createUser.username} registered.`);
        navigate("/login");
      }
    } catch (error) {
      setGeneralError("Registration failed");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: "10px",
          width: "100%",
          color: "white",
          backgroundColor: "#1c1f26",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Register
          </Typography>
          <form
            onSubmit={handleRegister}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                marginBottom: "16px",
              }}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                marginBottom: "16px",
              }}
            />
            {generalError && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                {generalError}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              size="large"
              fullWidth
              sx={{ mt: 2, height: "52px" }}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
          <Typography variant="body2" component="p" sx={{ mt: 6 }}>
            Already have an account?{" "}
            <Link
              onClick={() => navigate("/login")}
              sx={{ cursor: "pointer" }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
