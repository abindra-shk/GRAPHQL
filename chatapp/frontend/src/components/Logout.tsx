
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice'; // Adjust the import path
import { Button } from '@mui/material';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Button onClick={handleLogout} variant="contained" color="secondary">
      Logout
    </Button>
  );
};

export default LogoutButton;
