import { Navigate, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path='/posts' element={<>Posts</>} />
      <Route path='/post/:id' element={<>Single</>} />
      <Route path='*' element={<Navigate to='/posts' />} />
    </Routes>
  );
};
