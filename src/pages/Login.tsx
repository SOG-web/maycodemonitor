import React from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const { setIsLoggedIn, setUser } = React.useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      setUser({ name: 'Admin', email: 'admin@admin.com' });
      navigate('/');
      return;
    }

    setError('Invalid username or password');
    return;
  };

  return (
    <div className='min-w-full min-h-screen bg-white flex justify-center items-center'>
      <div className='w-[700px] h-[500px] bg-slate-100 shadow-2xl flex flex-col items-center'>
        <h1 className='mt-10 font-bold text-[25px]'>
          MayCode Editor Monitor
          {/* <span className='text-slate-500'>v0.1.0</span> */}
        </h1>
        <div className='flex flex-col items-center justify-center mt-10'>
          <p className='text-[20px] font-medium'>Login</p>
          <form onSubmit={onSubmit}>
            <div className='flex flex-col items-center justify-center mt-8'>
              <input
                type='text'
                className='w-[300px] h-[40px] border-2 border-slate-300 rounded-md px-2'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type='password'
                className='w-[300px] h-[40px] border-2 border-slate-300 rounded-md px-2 mt-4'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type='submit'
                className='w-[300px] h-[40px] bg-[#1E90FF] text-white rounded-md mt-4'
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
