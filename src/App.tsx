import { createContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AllPostsPage } from './pages/AllPostsPage';
import { SinglePostPage } from './pages/SinglePostPage';
import axios from './utils/axios';
import { User } from './utils/interfaces/user.interface';

export const UserContext = createContext<User[]>([]);

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get('/users');
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={users}>
      <Routes>
        <Route path='/posts' element={<AllPostsPage />} />
        <Route path='/post/:id' element={<SinglePostPage />} />
        <Route path='*' element={<Navigate to='/posts' />} />
      </Routes>
    </UserContext.Provider>
  );
};
