import { useQuery, gql } from '@apollo/client';
import { List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setRoom } from '../store/userSlice';
import { generateRoomId } from '../utils/getRoom';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
    }
  }
`;

interface UserListProps {
  onSelectUser: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ onSelectUser }) => {
  const { loading, error, data } = useQuery(GET_USERS);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.user.user);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error loading users</p>;

  const handleUserClick = (userId: string) => {
    const roomId = generateRoomId(currentUser.id, userId);
    dispatch(setRoom(roomId));
    onSelectUser(userId);
  };

  return (
    <List>
      {data?.users
        .filter((user: any) => user.id !== currentUser.id)
        .map((user: any) => (
          <ListItem key={user.id} onClick={() => handleUserClick(user.id)}>
            <ListItemText primary={user.username} />
          </ListItem>
        ))}
    </List>
  );
};

export default UserList;
