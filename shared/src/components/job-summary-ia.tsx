import { Stack } from '@mui/material'
import React from 'react'

const JobSummaryIA = ({
    id,
    title,
    company,
    location,
    salary
}: {
    id: string,
    title: string,
    company: string,
    location: string,
    salary: string
}) => {

    return (
        <Stack>
            <h3>{title}</h3>
            <Stack direction="row" gap={1}>
                <div>{company}</div> &bull;
                <div>{location}</div> &bull;
                <div>{salary}</div> &bull;
                <div>{id}</div>
            </Stack>
        </Stack>
    )
}

export default JobSummaryIA