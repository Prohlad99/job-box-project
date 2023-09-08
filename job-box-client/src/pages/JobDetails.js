import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsArrowReturnRight, BsArrowRightShort } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import meeting from "../assets/meeting.jpg";
import { useApplyMutation, useJobByIdQuery, useQuestionMutation, useReplayMutation } from "../features/job/jobApi";


const JobDetails = () => {

  // local state 
  const [replay, setReplay] = useState("")
  const {id }= useParams()

  // global state 
  const [apply, { isSuccess, isError, error}] = useApplyMutation()
  const [sendQuestion] = useQuestionMutation()
  const [sendReplay] = useReplayMutation()
  const {data} = useJobByIdQuery(id)
  const {user} = useSelector(state => state.firebase)

  // navigator 
  const navigate = useNavigate(); 

  // form hook 
  const{register, handleSubmit, reset} = useForm()

  // form object 
  const {
    companyName,
    position,
    location,
    experience,
    workLevel,
    employmentType,
    salaryRange,
    skills,
    requirements,
    responsibilities,
    overview,
    queries,
    _id,
  } = data?.data || {};


  // form submit handle form 
  const handleApply=()=>{
    const data = {
      userId : user._id,
      email : user.email,
      jobId : _id
    }

    // check user role 
    if(user.role === "employer"){
      toast.error("You need a candidate account to apply!!!");

      return
    }else if(user.role === ""){
      navigate("/register");

      return
    }
    else if(user.role === undefined){
      toast.error("You need a candidate account to apply")
      navigate("/register");

      return
    }else{

      apply(data)
    }
  }

  // handle candidate question 
  const handleQuestion =(data)=>{
    const queryData = {
      ...data,
      userId: user._id,
      email: user.email,
      jobId: _id
    }
    sendQuestion(queryData)
    console.log(data)
    reset()

  }

  // handle Q/A replay 
  const handleReplay =(id)=>{
    const data ={
      replay,
      userId: id
    }

    sendReplay(data)
  }

  
  // toast message 
  useEffect(()=>{
    if(isSuccess){
      toast.success("Apply Success.", {id: "apply"})
    }
    if(isError){
      toast.error(error,  {id: "apply"})
    }
  },[isSuccess, isError,error])
  

  return (
    <div className='pt-14 grid grid-cols-12 gap-5'>
      <div className='col-span-9 mb-10'>
        <div className='h-80 rounded-xl overflow-hidden'>
          <img className='h-full w-full object-cover' src={meeting} alt='' />
        </div>
        <div className='space-y-5'>
          <div className='flex justify-between items-center mt-5'>
            <h1 className='text-xl font-semibold text-primary'>{position}</h1>
            <button className='btn'
            onClick={handleApply}
            >Apply</button>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>Overview</h1>
            <p>{overview}</p>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>Skills</h1>
            <ul>
              {skills?.map((skill) => (
                <li key={Math.random()*11} className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>
              Requirements
            </h1>
            <ul>
              {requirements?.map((skill) => (
                <li key={Math.random()+2} className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>
              Responsibilities
            </h1>
            <ul>
              {responsibilities?.map((skill) => (
                <li key={Math.random()*2} className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className='my-5' />
        <div>
          <div>
            <h1 className='text-xl font-semibold text-primary mb-5'>
              General Q&A
            </h1>
             <div className='text-primary my-2'>
              {queries?.map(({ question, email, reply, id }) => (
                <div key={Math.random()*15}>
                  <small>{email}</small>
                  <p className='text-lg font-medium'>{question}</p>
                  {reply?.map((item) => (
                    <p className='flex items-center gap-2 relative left-5'>
                      <BsArrowReturnRight /> {item}
                    </p>
                  ))}

                  { user.role === "employer" && <div className='flex gap-3 my-5'>
                    <input placeholder='Reply' type='text' className='w-full' 
                    onBlur={(e)=>setReplay(e.target.value)}
                    />
                    <button
                      className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                      type='button'
                      onClick={()=>handleReplay(id)}
                    >
                      <BsArrowRightShort size={30} />
                    </button>
                  </div>}
                </div>
              ))}
            </div>
            { user.role === "candidate" && <form onSubmit={handleSubmit(handleQuestion)}>
            <div className='flex gap-3 my-5'>
              <input
                placeholder='Ask a question...'
                type='text'
                className='w-full'
                {...register("question")}
              />
              <button
                className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                type='submit'
              >
                <BsArrowRightShort size={30} />
              </button>
            </div>
            </form>}
          </div>
        </div>
      </div>
      <div className='col-span-3'>
        <div className='rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
          <div>
            <p>Experience</p>
            <h1 className='font-semibold text-lg'>{experience}</h1>
          </div>
          <div>
            <p>Work Level</p>
            <h1 className='font-semibold text-lg'>{workLevel}</h1>
          </div>
          <div>
            <p>Employment Type</p>
            <h1 className='font-semibold text-lg'>{employmentType}</h1>
          </div>
          <div>
            <p>Salary Range</p>
            <h1 className='font-semibold text-lg'>{salaryRange}</h1>
          </div>
          <div>
            <p>Location</p>
            <h1 className='font-semibold text-lg'>{location}</h1>
          </div>
        </div>
        <div className='mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
          <div>
            <h1 className='font-semibold text-lg'>{companyName}</h1>
          </div>
          <div>
            <p>Company Size</p>
            <h1 className='font-semibold text-lg'>Above 100</h1>
          </div>
          <div>
            <p>Founded</p>
            <h1 className='font-semibold text-lg'>2001</h1>
          </div>
          <div>
            <p>Email</p>
            <h1 className='font-semibold text-lg'>company.email@name.com</h1>
          </div>
          <div>
            <p>Company Location</p>
            <h1 className='font-semibold text-lg'>Los Angeles</h1>
          </div>
          <div>
            <p>Website</p>
            <a className='font-semibold text-lg' href='#'>
              https://website.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
