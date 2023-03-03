import React, { useEffect, useState } from 'react'
import { Card, CardActionArea, CardContent, CardHeader, Stack } from '@mui/material';
import { JobApplication } from '../models/JobApplication';
import ApplicationService from '../services/application.service';

const JobSummary = React.lazy(() => import('job_search/JobSummary'))
const RecentApplicationsCard = () => {
    const [applications, setApplications] = useState<JobApplication[]>([])
    useEffect(() => {
        const t = setInterval(() => {
            ApplicationService.fetchApplications().then((apps) => {
                setApplications(apps)
            })
        }, 1000)

        return () => {
            clearInterval(t)
        }
    }, [])
    return (
        <div>
            <Card>
                <CardContent>
                    <h2>Recent Applications</h2>
                    <Stack gap={2}>
                        {
                            applications.map((a) => {
                                return (

                                    <div key={a.id}>
                                        <React.Suspense fallback={'loading'}>
                                            <JobSummary jobId={a.jobId} />
                                        </React.Suspense>
                                    </div>
                                )
                            })
                        }
                    </Stack>
                </CardContent>
            </Card>
        </div>
    )
}

export default RecentApplicationsCard