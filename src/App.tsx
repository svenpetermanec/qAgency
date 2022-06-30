import { createContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getAllUsers } from './api/UsersApi';
import { AllPostsPage } from './pages/AllPostsPage';
import { SinglePostPage } from './pages/SinglePostPage';
import { User } from './utils/interfaces/user.interface';

export const UserContext = createContext<User[]>([]);

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const helloFromMessage = 'Hello from ';

  return (
    <UserContext.Provider value={users}>
      <Routes>
        <Route
          path='/posts'
          element={<AllPostsPage helloFromMessage={helloFromMessage} />}
        />
        <Route
          path='/post/:id'
          element={<SinglePostPage helloFromMessage={helloFromMessage} />}
        />
        <Route path='*' element={<Navigate to='/posts' />} />
      </Routes>
    </UserContext.Provider>
  );
};
