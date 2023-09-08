import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Dna } from 'react-loader-spinner';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.svg";
import { signInByEmailAndPassword, signInByPopup } from "../features/auth/authSlice";



const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, isLoading, isError, error} = useSelector(state => state.firebase)
  
  const onSubmit = ({email, password}) => {
    dispatch(signInByEmailAndPassword({email, password}))
  };

  useEffect(()=>{
    if(!isLoading && user.email){
      navigate("/")
    }
  },[user.email, isLoading])

  useEffect(()=>{
    if(isError){
      toast.error(error, {id: "auth"})
    }
  },[isError, error])
  return (
    <div className='flex h-screen items-center'>
      <div className='w-1/2'>
        <img src={loginImage} className='h-full w-full' alt='' />
      </div>
      <div className='w-1/2 grid place-items-center'>
        <div className='bg-[#FFFAF4] rounded-lg grid place-items-center p-10'>
          <h1 className='mb-10 font-medium text-2xl'>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-3'>
              <div className='flex flex-col items-start'>
                <label htmlFor='email' className='ml-5'>
                  Email
                </label>
                <input type='email' {...register("email")} id='email' />
              </div>
              <div className='flex flex-col items-start'>
                <label htmlFor='password' className='ml-5'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  {...register("password")}
                />
              </div>
              
              <div className='relative !mt-8'>
                <button
                  type='submit'
                  className='font-bold text-white rounded-full bg-primary w-full'
                >
                  <div className="flex justify-center">
                  {
                    isLoading ? <p className=""><Dna
                    visible={true}
                    height="50"
                    width="60"
                    ariaLabel="dna-loading"
                    wrapperStyle={{
                     
                    }}
                    wrapperClass="dna-wrapper"
                  /></p>:<p className="py-3">Log In</p>
                  }
                  </div>
                </button>
              </div>

              <div className="mt-8">
                  <div className="flex items-center">
                    <div className="h-[2px] w-[120px] bg-green-500 mr-2"></div>Or <div className="h-[2px] w-[120px] bg-green-500 ml-2"></div>
                  </div>
                  <div className='relative mt-4'>
                      <button
                      onClick={()=>dispatch(signInByPopup())}
                        className='font-bold text-gray-700 py-3 rounded-full bg-indigo-300 w-full'
                      >
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl"><FcGoogle/></span>
                        <span>Continue With Google</span>
                      </div>
                      </button>
                  </div>
               </div>

              <div>
                <p>
                  Don't have an account?{" "}
                  <span
                    className='text-primary hover:underline cursor-pointer'
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
