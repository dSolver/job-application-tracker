import { Card, CardHeader, Stack } from '@mui/material';
import React from 'react';

const RecentApplicationsCard = React.lazy(() => import('application_tracking/RecentApplicationsCard'))
const RecentlyViewedJobsCard = React.lazy(() => import('job_search/RecentlyViewedJobsCard'))
export const Dashboard = () => {

    return (
        <div data-test-component="Dashboard">
            <h1>Dashboard</h1>
            <Stack direction={'row'}>
                <React.Suspense fallback={'Loading Recent Applications'}>
                    <RecentApplicationsCard />
                </React.Suspense>
                <React.Suspense fallback={'Loading Recent Applications'}>
                    <RecentlyViewedJobsCard />
                </React.Suspense>
            </Stack>
        </div>
    )
}