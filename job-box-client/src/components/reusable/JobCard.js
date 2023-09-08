import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ jobData }) => {
  const navigate = useNavigate();
  console.log(jobData)
  
  return (
    <div>
      {
        jobData?.map(job =>(
          <div
      key={job._id}
      className='border border-gray-300 shadow-xl p-5 rounded-2xl text-primary'
    >
      <div className='flex justify-between  text-primary'>
        <div>
          <p className='text-xl'>{job.position}</p>
          <small className='text-primary/70 '>
            by{" "}
            <span className='font-semibold hover:text-primary cursor-pointer hover:underline transition-all'>
              {job.companyName}
            </span>
          </small>
          
        </div>
        <p>{job.location}</p>
      </div>
      <div className='flex justify-between items-center mt-5'>
        <p>{job.employmentType}</p>
        <button className='btn' onClick={() => navigate(`/job-details/${job._id}`)}>
          Details
        </button>
      </div>
    </div>
        ))
      }
    </div>
  );
};

export default JobCard;
