import React, { useEffect, useState } from 'react'
import { JobOpportunity } from '../models/JobOpportunity'
import { SearchService } from '../services/search.service'

const JobSummaryIA = React.lazy(() => import('shared/JobSummaryIA'))

const JobSummary = ({
    jobId
}: { jobId: string }) => {
    const [job, setJob] = useState<JobOpportunity>()
    useEffect(() => {
        SearchService.getJobById(jobId).then((j) => {
            setJob(j)
        })
    }, [jobId])

    if (!job) {
        return 'loading'
    }

    return (
        <React.Suspense fallback={'loading'}>
            <JobSummaryIA {...job} />
        </React.Suspense>
    )
}

export default JobSummary;