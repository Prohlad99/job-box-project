import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { Dna } from "react-loader-spinner";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.svg";
import { createUserByEmailAndPassword, signInByPopup } from "../features/auth/authSlice";
const Signup = () => {
  const { handleSubmit, register, reset, control } = useForm();
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch()
  const {user, isLoading, isError, error} = useSelector(state => state.firebase)
  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  const onSubmit = ({email, password}) => {
    dispatch(createUserByEmailAndPassword({email, password}))
  };

  useEffect(()=>{
    if(!isLoading && user.email){
      navigate("/")
    }
  },[user.email, isLoading])

  useEffect(()=>{
    if(isError){
      toast.error(error, {id:"auth"})
    }
  },[isError,error])
  return (
    <div className='flex h-screen items-center pt-14'>
      <div className='w-1/2'>
        <img src={loginImage} className='h-full w-full' alt='' />
      </div>
      <div className='w-1/2 grid place-items-center'>
        <div className='bg-[#FFFAF4] rounded-lg grid place-items-center p-10'>
          <h1 className='mb-10 font-medium text-2xl'>Sign up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-3'>
              <div className='flex flex-col items-start'>
                <label htmlFor='email' className='ml-5'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  {...register("email")}
                />
              </div>

              <div className='flex flex-col items-start'>
                <label htmlFor='password' className='ml-5'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  {...register("password")}
                />
              </div>
              <div className='flex flex-col items-start'>
                <label htmlFor='confirm-password' className='ml-5'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  id='confirm-password'
                  {...register("confirmPassword")}
                />
              </div>
             
              <div className='!mt-8 '>
                <button
                  type='submit'
                  className='font-bold text-white rounded-full bg-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed'
                  disabled={disabled}
                >
                  <div className="flex justify-center">
                  {
                    isLoading ? <p ><Dna
                    visible={true}
                    height="50"
                    width="60"
                    ariaLabel="dna-loading"
                    wrapperStyle={{
                     
                    }}
                    wrapperClass="dna-wrapper"
                  /></p>:<p className="py-3">Sign Up</p>
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
                  Already have an account?{" "}
                  <span
                    className='text-primary hover:underline cursor-pointer'
                    onClick={() => navigate("/login")}
                  >
                    Login
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

export default Signup;
