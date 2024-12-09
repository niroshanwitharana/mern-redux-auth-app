import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  Box, 
  Button 
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../../redux/slices/authSlice';

const Landing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);


  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error loading user details</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 4, textAlign: 'center' }}>
        <CardContent>
          <Avatar 
            sx={{ 
              width: 100, 
              height: 100, 
              margin: '0 auto 20px',
              bgcolor: 'primary.main' 
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h4" gutterBottom>
            Welcome, {user?.name}!
          </Typography>
          <Box sx={{ mt: 2 }}>
            {/* <Typography variant="subtitle1">
              Email: {user?.email}
            </Typography> */}
            <Typography variant="body2" color="text.secondary">
              You have successfully logged in to your account.
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ mt: 3 }} 
            onClick={() => navigate('/viewProfile')}
          >
            View Profile Details
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Landing;
