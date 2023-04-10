import { Link } from 'react-router-dom';

export default function Root() {
  return (
    <div className='bg-white min-h-screen min-w-full flex justify-center items-center flex-col'>
      <h1 className='text-[25px]'>
        Welcome to MayCode Editor Monitor Dashboard
      </h1>
      <Link
        to='/login'
        className='bg-[#1E90FF] text-white px-4 py-2 rounded-md mt-4'
      >
        Login
      </Link>
    </div>
  );
}
