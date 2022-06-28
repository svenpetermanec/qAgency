import { createContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AllPosts } from './pages/AllPosts';
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
        <Route path='/posts' element={<AllPosts />} />
        <Route path='/post/:id' element={<>Single</>} />
        <Route path='*' element={<Navigate to='/posts' />} />
      </Routes>
    </UserContext.Provider>
  );
};
