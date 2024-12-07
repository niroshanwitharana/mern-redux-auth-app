import React, { useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography,                   
  Button, 
  Box, 
  IconButton 
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, loadUser } from '../../redux/slices/authSlice';

const Navbar = () => {
  const { isAuthenticated, user, loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only dispatch loadUser if the user is authenticated and if user data is not already present
    if (isAuthenticated && !user) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated, user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  // Show loading spinner or nothing while user data is being fetched
  if (loading) {
    return <div>Loading...</div>; // Or a spinner/loading indicator
  }

  return (
    <AppBar position="static" sx={{ padding: 0, margin: 0 }}>
      <Toolbar sx={{ padding: 0 }}>
      <Typography 
          variant="h6" 
          component={Link} 
          to="/home" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit',
            px: 1 
          }}
        >
          Home
        </Typography>
        
        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Logout Button */}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
            {/* User Icon Button */}
            <IconButton 
              color="inherit" 
              onClick={() => navigate('/profile')}
              sx={{ mr: 2 }}
            >
              <AccountCircle />
            </IconButton>            
          </Box>
        ) : (
          <Box>
            {/* Login and Register Buttons */}
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
