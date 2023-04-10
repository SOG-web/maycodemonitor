import { useEffect, useState } from 'react';
import './App.css';
import LoginPage from './pages/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/404-page';
import Root from './routes/root';
import { AuthContext } from './contexts/AuthContext';
import Home from './pages/Home';

const NoAuthRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
]);

const AuthRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  // {
  //   path: '/login',
  //   element: <LoginPage />,
  //   errorElement: <ErrorPage />,
  // },
]);

interface User {
  name: string;
  email: string;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null as User | null);

  useEffect(() => {
    console.log('App.tsx useEffect');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        setUser,
        setIsLoggedIn,
      }}
    >
      {user ? (
        <RouterProvider router={AuthRouter} />
      ) : (
        <RouterProvider router={NoAuthRouter} />
      )}
    </AuthContext.Provider>
  );
}

export default App;
