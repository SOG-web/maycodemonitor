import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

import { AuthContext, logout } from '../contexts/AuthContext';

function Nav() {
  const { setIsLoggedIn, setUser } = React.useContext(AuthContext);

  const logOut = () => {
    logout();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    // nav bar with tailwind css
    <nav className='flex items-center justify-between flex-wrap bg-teal-500 p-6'>
      <div className='flex items-center flex-shrink-0 text-white mr-6'>
        <span className='font-semibold text-xl tracking-tight'>
          MayCode Editor Monitor
        </span>
      </div>
      <div className='flex items-center flex-shrink-0 text-white mr-[80px] gap-[50px]'>
        <Link className='font-semibold text-normal tracking-tight' to='/'>
          Home
        </Link>
        <Link
          className='font-semibold text-normal tracking-tight'
          to='/controls'
        >
          Controls
        </Link>
      </div>

      <div>
        <Button
          onClick={logOut}
          label='Logout'
          className='font-semibold text-normal tracking-tight w-[100px] h-[40px] bg-[#1E90FF] text-white rounded-md'
        ></Button>
      </div>
    </nav>
  );
}

export default Nav;
