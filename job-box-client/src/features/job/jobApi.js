import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        // post a job 
        postJob:builder.mutation({
            query:(data)=>({
                url:"/job",
                method:"POST",
                body: data
            }),
            invalidatesTags:["jobs"]
        }),

        // apply to a job 
        apply:builder.mutation({
            query:(data)=>({
                url:"/apply",
                method:"PATCH",
                body: data
            }),
            invalidatesTags:["jobs"]
        }),

        // Q/A 
        question:builder.mutation({
            query:(data)=>({
                url:"/query",
                method:"PATCH",
                body: data
            }),
        }),

        // replay 
         // Q/A 
         replay:builder.mutation({
            query:(data)=>({
                url:"/replay",
                method:"PATCH",
                body: data
            }),
        }),

        // get all job 
        getJobs:builder.query({
            query:()=>({
                url:"/jobs",
            }),
            providesTags: ["jobs"]
        }),

        // get candidate applied by ID 
        getAppliedJobs:builder.query({
            query:(email)=>({
                url:`/applied-jobs/${email}`,
            }),
        }),

        // get job by id 
        jobById:builder.query({
            query:(id)=>({
                url:`/job/${id}`,
            })
        })
    })
})

export const {usePostJobMutation, useGetJobsQuery, useJobByIdQuery, useApplyMutation, useGetAppliedJobsQuery, useQuestionMutation, useReplayMutation} = jobApi