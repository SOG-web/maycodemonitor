import React from 'react';
import { AuthContext, setToken } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState() as any;
  const [loading, setLoading] = React.useState(false);

  const { setIsLoggedIn, setUser } = React.useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const user = await login({ email, password });

    if (user.status === false) {
      // console.log(user.error);
      setLoading(false);
      setError(user.error);
      return;
    }
    // console.log(user.data);
    setToken(user.data?.token as string);
    navigate('/');
    setIsLoggedIn(true);
    setUser({
      name: user.data?.user.name as string,
      email: user.data?.user.email as string,
    });
  };

  if (loading) {
    return (
      <div className='min-w-full min-h-screen bg-white flex justify-center items-center'>
        <div className='w-[700px] h-[500px] bg-slate-100 shadow-2xl flex flex-col items-center'>
          <h1 className='mt-10 font-bold text-[25px]'>
            MayCode Editor Monitor
            {/* <span className='text-slate-500'>v0.1.0</span> */}
          </h1>
          <div className='flex flex-col items-center justify-center mt-10'>
            <p className='text-[20px] font-medium'>Login</p>
            <p className='text-[30px] font-medium mt-10'>Loading.....</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-w-full min-h-screen bg-white flex justify-center items-center'>
        <div className='w-[700px] h-[500px] bg-slate-100 shadow-2xl flex flex-col items-center'>
          <h1 className='mt-10 font-bold text-[25px]'>
            MayCode Editor Monitor
            {/* <span className='text-slate-500'>v0.1.0</span> */}
          </h1>
          <div className='flex flex-col items-center justify-center mt-10'>
            <p className='text-[20px] font-medium'>Login</p>
            <p className='text-[30px] font-medium mt-10'>{error.error}</p>
          </div>
        </div>
      </div>
    );
  }

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
                type='email'
                className='w-[300px] h-[40px] border-2 border-slate-300 rounded-md px-2'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
