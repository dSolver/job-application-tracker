import React from 'react'
import { JobOpportunity } from '../models/JobOpportunity';
import { Stack } from '@mui/material';

const JobSearchResult = ({ job }: { job: JobOpportunity }) => {

    return (
        <Stack direction="row" gap={1}>
            <div>{job.title}</div>
            <div>{job.company}</div>
            <div>{job.id}</div>
        </Stack>
    )
}

export default JobSearchResult