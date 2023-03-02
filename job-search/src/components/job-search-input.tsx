import { Button, Card, Stack } from '@mui/material'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import React, { Suspense, useState } from 'react'
import { JobOpportunity } from '../models/JobOpportunity'
import { SearchService } from '../services/search.service'
import JobSearchResult from './job-search-result'
import "./job-search-input.scss"
const Search = React.lazy(() => import('shared/Search'))

const JobSearchInput = () => {

    const [results, setResults] = useState<JobOpportunity[]>([])
    const [open, setOpen] = useState(false);
    return (
        <div
            data-component="job-search-input"
            className={open ? 'active' : ''}

        >
            <Stack direction={'row'} justifyContent={'center'}>
                <Suspense fallback={"Loading..."}>
                    <Search fields={['keyword']} results={results} onInputChange={(params: { [key: string]: string | number | boolean }) => {
                        if (params.keyword) {
                            setOpen(true)

                            SearchService.searchJobs(params.keyword.toString()).then((data) => {
                                setResults(data)
                            })
                        }
                    }} />
                </Suspense>
                {open && <Button onClick={() => setOpen(false)}>Close</Button>}
            </Stack>

            {
                open && (
                    <Stack gap={2}>
                        {
                            results.length === 0 && 'No results'
                        }
                        {
                            results.map((job) => {
                                return <Card key={job.id}>
                                    <CardActionArea>
                                        <CardContent>
                                            <JobSearchResult job={job} />
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            })
                        }
                    </Stack>
                )
            }
            <div>

            </div>
        </div>
    )
}

export default JobSearchInput