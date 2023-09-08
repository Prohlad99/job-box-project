import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { useGetAppliedJobsQuery } from "../../features/job/jobApi";

const AppliedJobs = () => {
  const {
    user: { email },
  } = useSelector((state) => state.firebase);
  const { data, isLoading } = useGetAppliedJobsQuery(email);
  console.log(data?.data)
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className='text-xl py-5'>Applied jobs</h1>
      <div className='grid grid-cols-2 gap-5 pb-5'>
       
          <JobCard jobData={data.data} />
  
      </div>
    </div>
  );
};

export default AppliedJobs;
