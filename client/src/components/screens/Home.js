import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box textAlign="center">
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to My App
          </Typography>
          <Typography variant="body1" gutterBottom>
            This is a dummy homepage designed to showcase the features of our application.
            Navigate through the app to explore registration, login, and profile management functionality.
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Your one-stop solution for managing user authentication and profiles.
          </Typography>
          <Box mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/register')}
              sx={{ mr: 2 }}
            >
              Register Now
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
