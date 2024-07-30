import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Link,
  Paper,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import { setUser } from '../store/userSlice'; // Adjust the import path

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setGeneralError('');

    try {
      const { data } = await loginUser({
        variables: { username, password },
      });
      const { token, user } = data.loginUser;
      dispatch(setUser({ user, token }));
      navigate('/chatpage');
    } catch (error) {
      setGeneralError('Invalid username or password');
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: '10px',
          width: '100%',
          color: 'white',
          backgroundColor: '#1c1f26',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <form
            onSubmit={handleLogin}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
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
                marginBottom: '16px',
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
                marginBottom: '16px',
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
              sx={{ mt: 2, height: '52px' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <Typography variant="body2" component="p" sx={{ mt: 6 }}>
            Forgot{' '}
            <Link
              onClick={() => navigate('/forget-password')}
              sx={{ cursor: 'pointer' }}
            >
              Password?
            </Link>
          </Typography>
          <Typography variant="body2" component="p" sx={{ mt: 1 }}>
            Don't have an account?{' '}
            <Link
              onClick={() => navigate('/register')}
              sx={{ cursor: 'pointer' }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
