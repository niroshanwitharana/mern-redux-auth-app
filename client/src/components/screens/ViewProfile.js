import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUser } from '../../redux/slices/authSlice';

const ViewProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    } else {
      setUserData({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [dispatch, user]);

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          My Profile
        </Typography>
        <Box sx={{ width: '100%', mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Name:</strong> {userData.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Email:</strong> {userData.email}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => navigate('/profile')}
          sx={{ mt: 2 }}
        >
          Edit Profile
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => navigate('/landing')}
          sx={{ mt: 2 }}
        >
          Back to Dashboard
        </Button>
      </Paper>
    </Container>
  );
};

export default ViewProfile;
