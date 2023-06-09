import { useEffect, useState } from 'react';
import './App.css';
import LoginPage from './pages/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/404-page';
import Root from './routes/root';
import { AuthContext, getToken } from './contexts/AuthContext';
import Home from './pages/Home';
import jwt_decode from 'jwt-decode';
import ControlsPage from './pages/Controls';
import ViewPage from './pages/View';
import { Record } from './api/interface/records/record.interface';
import { RecordContext } from './contexts/RecordContext';

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
  {
    path: '/controls',
    element: <ControlsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'view/:id',
    element: <ViewPage />,
    // errorElement: <ErrorPage />,
  },
]);

interface User {
  name: string;
  email: string;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null as User | null);
  const [records, setRecords] = useState<Record[]>([]);
  const [viewRecord, setViewRecord] = useState<Record | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      const token = getToken();

      if (token) {
        setIsLoggedIn(true);
        const decoded: any = jwt_decode(token);
        // console.log(decoded);
        setUser({
          name: decoded.name,
          email: decoded.email,
        });
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setIsError(error);
    }
  }, []);

  if (loading) {
    return (
      <div className='min-w-full min-h-screen flex justify-center items-center'>
        <p className='text-[30px] font-semibold'>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='min-w-full min-h-screen flex justify-center items-center'>
        <p className='text-[30px] font-semibold'>{isError}</p>
      </div>
    );
  }

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
        <RecordContext.Provider
          value={{
            records,
            setRecords,
            viewRecord,
            setViewRecord,
          }}
        >
          <RouterProvider router={AuthRouter} />
        </RecordContext.Provider>
      ) : (
        <RouterProvider router={NoAuthRouter} />
      )}
    </AuthContext.Provider>
  );
}

export default App;
