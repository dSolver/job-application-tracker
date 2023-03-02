import { Card, CardActionArea, CardContent, Stack } from '@mui/material'
import React from 'react'

const RecentlyViewedJobsCard = () => {
    return (
        <div>
            <Card>
                <CardActionArea>
                    <CardContent>
                        <h3>Recently viewed jobs</h3>
                        <Stack></Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}

export default RecentlyViewedJobsCard