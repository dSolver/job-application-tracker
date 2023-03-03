import { Card, CardHeader, Stack } from '@mui/material';
import React from 'react';

const RecentApplicationsCard = React.lazy(() => import('application_tracking/RecentApplicationsCard'))
const RecentlyViewedJobsCard = React.lazy(() => import('job_search/RecentlyViewedJobsCard'))
export const Dashboard = () => {

    return (
        <Stack gap={4} sx={{ height: '100%' }}>
            <h1>Dashboard</h1>
            <Stack direction={'row'} sx={{ backgroundColor: '#f0f0f0', padding: '16px', maxWidth: '1200px', minWidth: '80vw', margin: 'auto' }}>
                <React.Suspense fallback={'Loading Recent Applications'}>
                    <RecentApplicationsCard />
                </React.Suspense>
            </Stack>
        </Stack>
    )
}