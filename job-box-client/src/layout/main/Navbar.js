import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import { logOut } from "../../features/auth/authSlice";

const Navbar = () => {
  const { pathname } = useLocation();
  const {user, isLoading} = useSelector(state => state.firebase)
  const dispatch = useDispatch()

  return (
    <nav
      className={`h-14 fixed w-full z-[999] ${
        pathname === "/" ? null : "bg-white"
      }`}
    >
      <ul className='max-w-7xl mx-auto flex gap-3 h-full items-center'>
        <li className='flex-auto font-semibold text-2xl'>
          <Link to='/'>JobBox</Link>
        </li>
        <li>
          <Link className='hover:text-primary' to='/jobs'>
            Jobs
          </Link>
        </li>
        {
          user.email && user.role &&<li>
          <Link
            className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
            to='/dashboard'
          >
            Dashboard
          </Link>
        </li>
        }

        {
          user.email && !user.role && <li>
          <Link
            className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
            to='/register'
          >
            Get Started
          </Link>
        </li>

        }

        {
          user.email && !isLoading? <li>
          <button onClick={()=>dispatch(logOut())}  className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '>Log Out</button>
        </li> :<li>
          <Link
            className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
            to='/login'
          >
            Login
          </Link>
        </li>
        }

       
      </ul>
    </nav>
  );
};

export default Navbar;
